import { PointModel } from "./../models/point";
import { TicketModel } from "../models/ticket";

interface POINT {
  userId: string;
  room: string;
  username: string;
  team: string;
  point: number;
  icon: string;
  color: string;
}

class Points {

  // add point/card number to a room
  async addPoint({ userId, username, room, team, point, color, icon }: POINT) {
    try {
      if (!point || !userId || !username || !room || !team || !color || !icon) {
        return {
          error: "one or two fields are missing",
        };
      }

      const newUserPoint = {
        userId,
        username,
        room,
        team,
        point,
        color,
        icon,
      };

      const pointData = await PointModel.findOneAndUpdate(
        {
          room: room,
          userId: userId,
        },
        { $set: { ...newUserPoint } },
        { new: true, upsert: true }
      ).exec();

      await TicketModel.findOneAndUpdate(
        {
          room: room,
        },
        { $inc: { totalPoints: Number(point) } }
      ).exec();

      return {
        userPoint: pointData,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  getTicketForRoom(room: string) {
    // return this.ticket.find((t) => t.room === room);
  }

  // get all points associated with room
  async getAllPoints(room: string) {
    const pointsData = await PointModel.find({
      room: room,
    });

    return { pointsData };
  }

  removePoints(room: string, userId: string) {
    // this.points = this.points.filter(
    //   (point) => point.room === room && point.userId !== userId
    // );
  }

  // clear all points associated with room from database
  async clearPoints(room: string) {
   try {
    const deletedPoints = await PointModel.deleteMany({ room: room})
    return {
      deletedPoints
    }
   } catch (error) {
     return {
       error
     }
   }
  }
}

export default Points;
