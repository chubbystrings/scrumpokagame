interface USER {
  id: string;
  room: string;
  username: string;
  team: string;
  type: "author" | "user";
  avatar?: string;
  highestNumber?: number;
}

import { UserModel } from "../models/user";
import { TicketModel } from "../models/ticket";
import { PointModel } from "../models/point";
import { RoomModel } from "../models/room";

class Users {

  // add new user to room
  async addUser({
    id,
    username,
    room,
    team,
    type,
    avatar,
    highestNumber,
  }: USER) {
    const validName = username;

    if (!validName || !room) {
      return {
        error: "username and room are required",
      };
    }

    const user = {
      id,
      username,
      room,
      team,
      type,
      avatar,
      highestNumber,
    };

    try {
      const savedUser = new UserModel(user);
      const userData = await savedUser.save();
      return { user: userData };
    } catch (err: any) {
      return {
        error: "could not save user",
      };
    }
  }

 
  // remove a user from room
  async removeUser(id: string, room: string) {
    try {
     
      const point = await PointModel.findOne({ room: room, userId: id });
      if (point) {

        const p = point?.point;
       
        await point?.deleteOne();
  
        await TicketModel.findOneAndUpdate(
          {
            room: room,
            totalPoints: {$gte: p}
          },
          { $inc: { totalPoints: Number(-p!) } }
        ).exec();  
      } 
        await UserModel.deleteOne({ id: id });
        const { users: updatedUsers } = await this.getUsers(room);
        return {
          updatedUsers
        }
    } catch (error) {
      console.log(error);
      return { error }
    }
  }

  // get a particular user details
  async getUser(id: string) {
    const user = await UserModel.findOne({
      id: id,
    });
    return { user };
  }

  async confirmUser(id: string) {
    const user = await UserModel.findOne({
      id: id,
    });
    return user !== null;
  }

  // get all users in room
  async getUsers(room: string) {
    const users = await UserModel.find({
      room: room,
    });
    return { users };
  }

  // end session/game and delete all data associated with room from database
  async endSession(room: string) {
    try {
      await UserModel.deleteMany({ room: room });
      await TicketModel.deleteMany({ room: room });
      await PointModel.deleteMany({ room: room });

      await RoomModel.deleteOne({ room: room });
    } catch (error) {
      console.log(error);
    }
  }
}

export default Users;
