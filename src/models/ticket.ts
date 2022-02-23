import { Schema, model } from "mongoose";
import { TICKET } from "../types";

const ticketSchema = new Schema(
  {
    team: { type: String, required: true },
    name: { type: String, required: true },
    room: {
      type: String,
      required: true,
      ref: "Room",
    },
    author: { type: String, required: true },
    winingPoint: [
      {
        room: {
          type: String,
          required: true,
          ref: "Room",
        },

        team: { type: String, required: true },
        point: { type: Number, required: true },
        icon: { type: String, required: true },
        color: { type: String, required: true },
      },
    ],
    totalPoints: { type: Number, required: true },
    revealed: Boolean,
  },
  { timestamps: true }
);

export const TicketModel = model<TICKET>("Ticket", ticketSchema);
