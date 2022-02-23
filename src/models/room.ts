import { Schema, model } from "mongoose";
import { ROOM } from "../types";

const roomSchema = new Schema(
  {
    team: { type: String, required: true },
    fibonacci: [
      {
        icon: { type: String, required: true },
        number: { type: Number, required: true },
        color: { type: String, required: true },
      },
    ],
    room: { type: String, required: true, unique: true},
    author: { type: String, required: true },
    highestNumber: { type: Number, required: true },
  },
  { timestamps: true }
);

export const RoomModel = model<ROOM>("Room", roomSchema);
