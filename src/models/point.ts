import { Schema, model } from "mongoose";
import { POINT } from "../types";

const PointSchema = new Schema(
    {
  userId: {
    type: String,
    required: true,
    ref: "User",
  },

  room: {
    type: String,
    required: true,
    ref: "Room",
  },

  username: { type: String, required: true },
  team: { type: String, required: true },
  point: { type: Number, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
},
{ timestamps: true }
);

export const PointModel = model<POINT>("Point", PointSchema);
