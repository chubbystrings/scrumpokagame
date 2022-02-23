import { Schema, model } from "mongoose";
import { USER } from "../types";

const userSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    room: { 
        type: String,
        required: true,
        ref: "Room", 
    },
    team: { type: String, required: true },
    type: {
      type: String,
      enum: ["author", "user"],
      default: "user",
      required: true,
    },
    avatar: { type: String },
    highestNumber: { type: Number },
  },
  { timestamps: true }
);



export const UserModel = model<USER>("User", userSchema);
