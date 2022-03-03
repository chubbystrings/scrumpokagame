import { RoomModel } from "../models/room";
interface ROOMS {
  [roomId: string]: ROOM;
}

interface FIBONACCI {
  icon: string;
  number: number;
  color: string;
}

type ROOM = {
  team: string;
  fibonacci: FIBONACCI[];
  room: string;
  author: string;
  highestNumber: number;
};

class Rooms {

  expiry;
  timer: NodeJS.Timer | null

  constructor () {
    this.expiry = 0;
    this.timer = null
  }

  // create a new room/session
  async addRoom(room: ROOM) {
    try {
      const roomDetails = {
        ...room,
      };
      const savedRoom = new RoomModel(roomDetails);
      const roomData = await savedRoom.save();
      return {
        roomData,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  // check if room exists in database
  async roomExists(room: string) {
    const roomData = await RoomModel.findOne({
      room: room,
    }).exec();

    return roomData !== null;
  }

  // get details of a particular room
  async getRoomDetails(room: string) {
    const roomData = await RoomModel.findOne({
      room: room,
    })
      .lean()
      .exec();
    return { roomData };
  }

  removeRoom(room: string) {
    // delete this.rooms[room]
  }

  startTimer(expiryTime: number, callback: () => void) {
    this.timer = setInterval(() => {
     
      if (this.expiry === expiryTime) {
        return callback()
      }

      this.expiry += 1
    }, 1000)
  }

  clearTimer() {
    clearInterval(this.timer as NodeJS.Timer)
    this.expiry = 0
  }

  restartTimer(expiryTime: number, callback: () => void) {
    this.clearTimer();
    this.startTimer(expiryTime, callback)
  }

}

export default Rooms;
