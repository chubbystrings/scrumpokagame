import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import Users from "../utils/users";
import Points from "../utils/points";
import crypto from "crypto";
import Rooms from "../utils/rooms";
import { generateFibonacci } from "../utils/fibonnaci";
import Ticket from "../utils/ticket";

const useSocketService = () => {
  const usersInstance = new Users();
  const points = new Points();
  const rooms = new Rooms();
  const ticketInstance = new Ticket();
  const colors = ["red", "black"];
  const timeout = 600

  const pokerNames = [
    "BIconSuitClubFill",
    "BIconSuitDiamondFill",
    "BIconSuitHeartFill",
    "BIconSuitSpadeFill",
  ];

  const randomPoker = () => {
    const poker = Math.floor(Math.random() * pokerNames.length);
    return pokerNames[poker];
  };

  const randomColor = () => {
    const rand = Math.floor(Math.random() * colors.length);
    return colors[rand];
  };

  const emit = (io: Server<DefaultEventsMap>) => {
    io.on("connection", (socket) => {
      console.log("a user connected");

      // listens to when a a room is created
      socket.on(

        "create",
        ({ username, team, avatar, highestNumber }, callback) => {
          const room = crypto.randomUUID();

          // create room data
          const data = {
            room,
            team,
            highestNumber: highestNumber ? Number(highestNumber) : 13,
            author: username,
            fibonacci: generateFibonacci(Number(highestNumber)).map((v) => ({
              number: v,
              icon: randomPoker(),
              color: randomColor(),
            })),
          };

          // IIFE anonymous async function
          (async () => {
            const { error: roomError, roomData } = await rooms.addRoom(data);
            const { error: userError, user } = await usersInstance.addUser({
              id: socket.id,
              username,
              room: room,
              team,
              type: "author",
              avatar,
              highestNumber: highestNumber ? Number(highestNumber) : 13,
            });

            if (roomError) {
              return callback(roomError, null);
            }

            if (userError) {
              return callback(userError, null);
            }

            const { users } = await usersInstance.getUsers(
              user?.room as string
            );

            socket.join(user!.room);
            rooms.startTimer(timeout, () => {
              rooms.clearTimer()
             socket.emit('timeout')
            })

            io.to(user?.room as string).emit("all-users", {
              room: user?.room,
              team: user?.team,
              users,
              roomData,
            });

            callback(null, user);
          })();
        } 
      );

      socket.on("timeout-response", ({ room, response}, callback) => {
       (async () => {
        if (response) {
          callback()
          rooms.startTimer(timeout, () => {
            rooms.clearTimer();
           socket.emit('timeout')
          })
        } else {
          await usersInstance.endSession(room);
          callback()
          socket.broadcast.to(room as string).emit("session-end");
        }
       })()
      })

      //listens to event to confirm room is available
      socket.on("confirm-room", (room, callback) => {
        (async () => {
          const team = await rooms.roomExists(room);
          callback(team);
        })();
      });

      //listens for event to confirm user is exists
      socket.on("confirm-user", (callback) => {
        (async () => {
          const userExist = await usersInstance.confirmUser(socket.id);
          callback(userExist);
        })();
      });

      // listens to event to join a session/room
      socket.on("join", ({ username, room, avatar }, callback) => {
        (async () => {
          const roomExist = await rooms.roomExists(room);
          if (!roomExist) {
            return callback("Room does not exist");
          }
          const { roomData } = await rooms.getRoomDetails(room);
          const { error: userError, user } = await usersInstance.addUser({
            id: socket.id,
            username,
            room,
            team: roomData?.team as string,
            type: "user",
            avatar,
            highestNumber: undefined,
          });

          if (userError) {
            return callback(userError, null);
          }
          const { users } = await usersInstance.getUsers(user?.room as string);

          //join specific room
          socket.join(user!.room);

          // emit all users and room data to frontend
          io.to(user?.room as string).emit("all-users", {
            room: user?.room,
            team: user?.team,
            users,
            roomData,
          });

          
          const { pointsData } = await points.getAllPoints(
            user?.room as string
          );
          const { ticketData } = await ticketInstance.getTicketDetails(
            user?.room as string
          );

          // emit to all users, all points added in room to frontend
          io.to(user?.room as string).emit("all-points", {
            room: user?.room,
            points: pointsData,
          });

          // emit ticket details to frontend
          io.to(user?.room as string).emit("ticket-name", {
            ticket: ticketData,
          });

          // notify users in the room accept current user
          socket.broadcast.to(user?.room as string).emit("notification", {
            message: `${user?.username} has joined this session`,
          });

          callback(null, user);
        })();
      });

      // listen for event to restart a session
      socket.on("re-start", ({ room }) => {
        (async () => {
          const { user } = await usersInstance.getUser(socket.id);
          await ticketInstance.deleteTicket(room);
          await points.clearPoints(room);
          const { ticketData } = await ticketInstance.getTicketDetails(
            user?.room as string
          );

          rooms.restartTimer(timeout, () => {
            rooms.clearTimer();
           socket.emit('timeout')
          })

          const { pointsData } = await points.getAllPoints(
            user?.room as string
          );

          io.to(user?.room as string).emit("all-points", {
            room: user?.room,
            points: pointsData,
          });

          socket.broadcast.to(room as string).emit("notification", {
            message: `${user?.username} ticket ended by ${user?.username}`,
          });

          io.to(room as string).emit("ticket-name", {
            ticket: ticketData,
          });
        })();
      });

      // listens to event to add individual points
      socket.on("add-point", ({ point, color, icon }, callback) => {
        (async () => {
          const { user } = await usersInstance.getUser(socket.id);

          const newUserPoint = {
            point,
            userId: socket.id,
            team: user?.team as string,
            username: user?.username as string,
            room: user?.room as string,
            color,
            icon,
          };

          const { error, userPoint } = await points.addPoint(newUserPoint);

          if (error) {
            return callback(error, null);
          }

          

          const { pointsData } = await points.getAllPoints(
            user?.room as string
          );

          io.to(user?.room as string).emit("all-points", {
            room: user?.room,
            points: pointsData,
          });

          socket.broadcast.to(user?.room as string).emit("notification", {
            message: `${user?.username} ${user?.username} point added`,
          });
          callback(null, userPoint);
        })();
      });

      //Add new ticket name
      socket.on("add-ticket", ({ name, room, team, author }, callback) => {
        (async () => {
          const roomExist = rooms.roomExists(room);

          if (!roomExist) {
            return callback("room does not exist", null);
          }
          await points.clearPoints(room);
          const ticketDetails = {
            room,
            team,
            name,
            author,
            totalPoints: 0,
            winningPoint: [],
            revealed: false,
          };

          const { error, ticketData } = await ticketInstance.addTicket(
            ticketDetails
          );

          if (error) {
            return callback(error, null);
          }

          rooms.restartTimer(timeout, () => {
            rooms.clearTimer();
           socket.emit('timeout')
          })

          const { pointsData } = await points.getAllPoints(
            ticketData?.room as string
          );

          io.to(ticketData?.room as string).emit("all-points", {
            room: ticketData?.room,
            points: pointsData,
          });

         

          socket.broadcast.to(ticketData?.room as string).emit("notification", {
            message: `${author} created a new ticket ${ticketData?.name}`,
          });

          io.to(ticketData?.room as string).emit("ticket-name", {
            ticket: ticketData,
          });

          io.to(ticketData?.room as string).emit("points-reveal", {
            room: ticketData?.room,
            reveal: {
                room,
                team,
                reveal: false,
                totalPoints: 0,
                ticket: name
            },
          });

          callback(null, ticketData);
        })();
      });

      // listen for event to Reveal room points
      socket.on("reveal-points", ({ room }, callback) => {
        (async () => {
          rooms.restartTimer(timeout, () => {
            rooms.clearTimer();
           socket.emit('timeout')
          })

          const { user } = await usersInstance.getUser(socket.id);
          const { reveal } = await ticketInstance.revealPointsInTicket(room);

          

          io.to(user?.room as string).emit("notification", {
            message: `${user?.username} has revealed the results`,
          });

          io.to(user?.room as string).emit("points-reveal", {
            room: user?.room,
            reveal,
          });

          io.to(user?.room as string).emit("ticket-name", {
            ticket: {},
          });

          callback();
        })();
      });

      // listens to event when user disconnects.
      socket.on("disconnect", () => {
        (async () => {
          const { user } = await usersInstance.getUser(socket.id);
          const { users } = await usersInstance.getUsers(user?.room as string);
         
          if (user) {
            if (user?.type === "author" || users.length === 0) {
              await usersInstance.removeUser(socket.id, user?.room as string);
              await usersInstance.endSession(user?.room as string);
              rooms.clearTimer();
              io.to(user?.room as string).emit("session-end");
            } else {
              const { updatedUsers } = await usersInstance.removeUser(socket.id, user?.room as string);
              
              const { roomData } = await rooms.getRoomDetails(
                user?.room as string
              );
              const { pointsData } = await points.getAllPoints(
                user?.room as string
              );

              io.to(user?.room as string).emit("notification", {
                message: `${user?.username} has exited this session`,
              });

              io.to(user?.room as string).emit("all-users", {
                room: user?.room,
                team: user?.team,
                users: updatedUsers,
                roomData,
              });


              io.to(user?.room as string).emit("all-points", {
                room: user?.room,
                points: pointsData,
              });
            }
          }
        })();
      });
    });
  };

  return {
    emit,
  };
};

export default useSocketService;
