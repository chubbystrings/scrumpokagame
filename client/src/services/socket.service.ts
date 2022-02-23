import { io } from "socket.io-client";
import { POINT, REVEAL, TICKET, USER, ROOM } from "../types/types";
import { useStore } from "../store";
import { setUser } from "@/utils/localStorage";
import { SESSION_END } from "@/utils/ModalNames";

class SocketioService {
  socket: any;
  // constructor() {}

  setupSocketConnection() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);

    this.listeners();
  }

  confirmUser(callback: (bool: boolean) => void) {
    this.socket.emit("confirm-user", (confirm: boolean) => {
      callback(confirm);
    });
  }

  confirmRoom(room: string, callback: (b: boolean) => void) {
    this.socket.emit("confirm-room", room, (confirm: boolean) => {
      callback(confirm);
    });
  }

  createRoom(
    team: string,
    username: string,
    avatar: string,
    highestNumber: string,
    callback: (room: string) => void
  ) {
    const store = useStore();
    const userDetail = {
      team,
      username,
      avatar,
      highestNumber
    };
    this.socket.emit("create", userDetail, (error: string, user: USER) => {
      if (error) {
        console.log(error);
        return;
      }
      store.setCurrentUser(user);
      setUser(user, "author");
      
      callback(user.room);
    });
  }

  joinRoom(
    username: string,
    room: string,
    avatar: string,
    callback: () => void
  ) {
    const store = useStore();
    const user = {
      room,
      username,
      avatar,
    };

    this.socket.emit("join", user, (error: string, user: USER) => {
      if (error) {
        console.log(error);
        return;
      }
      store.setCurrentUser(user);
      setUser(user, "user");
      callback();
    });
  }

  AddPoint({ point, color, icon}: {point: number; color: string; icon: string}) {
    const userPoint = {
      point,
      color,
      icon
    };

    this.socket.emit("add-point", userPoint, (error: string, user: USER) => {
      console.log(error);
      if (error) {
        console.log(error);
        return;
      }
    });
  }

  addTicket({name, room, team, author}:{name: string, room: string, team: string, author: string}) {
    const store = useStore();
    const roomTicket = {
      name,
      room,
      team,
      author
    };

    this.socket.emit(
      "add-ticket",
      roomTicket,
      (error: string, ticket: TICKET) => {
        if (error) {
          console.log(error);
          return;
        }
        store.setCurrentTicket(ticket);
      }
    );
  }

  restart(room: string) {
    const userRoom = {
      room,
    };
    this.socket.emit('re-start', userRoom)
  }

  revealPoint(room: string) {
    const userRoom = {
      room,
    };
    this.socket.emit("reveal-points", userRoom, () => {
      //
    });
  }

  // clearPoints() {
  //   this.socket.emit("clear-points");
  // }

  listeners() {
    //
    const store = useStore();

    this.socket.on(
      "all-users",
      ({
        room,
        users,
        team,
        roomData
      }: {
        room: string;
        users: USER[];
        team: string;
        roomData: ROOM
      }) => {
        store.setUsers(users);
        store.setTeamName(team);
        store.setFibonacci(roomData.fibonacci)
      }
    );

    this.socket.on(
      "all-points",
      ({ room, points }: { room: string; points: POINT[] }) => {
        store.setPoints(points);
      }
    );

    this.socket.on(
      "points-reveal",
      ({ room, reveal }: { room: string; reveal: REVEAL }) => {
        store.setReveal(reveal);
      }
    );

    this.socket.on("ticket-name", ({ ticket }: { ticket: TICKET }) => {
      store.setCurrentTicket(ticket);
    });

    this.socket.on("notification", ({ message }: {message: string}) => {
      store.setNotification(message)
    })

    this.socket.on("session-end", () => {
      store.openModal(SESSION_END)
    })
  }
}

const socket = new SocketioService();

export default socket;
