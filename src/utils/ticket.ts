import { Schema } from "mongoose";
import { TicketModel } from "../models/ticket";
import { PointModel } from "../models/point";
import { RoomModel } from "../models/room";
import { TICKET, POINT } from "../types";
import { generateFibonacci } from "./fibonnaci";

class Ticket {
    // add new ticket to start new game
  async addTicket(payload: TICKET) {
    try {
      const ticket = { ...payload };

      if (!ticket.name || !ticket.room ) {
          return {
              error: 'Some fields are empty'
          }
      }

      const ticketData = await TicketModel.findOneAndUpdate(
        {
          room: ticket.room,
        },
        { $set: { ...ticket } },
        { new: true, upsert: true }
      ).exec();

      return {
        ticketData,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  // get ticket details
  async getTicketDetails(room: string) {
    try {
      const ticketData = await TicketModel.findOne({
        room: room,
      });
      return { ticketData };
    } catch (error) {
      return {
        error,
      };
    }
  }

  async deleteTicket(room: string) {
    try {
      const ticketData = await TicketModel.deleteOne({ room: room });
      return { ticketData };
    } catch (error) {
      return {
        error,
      };
    }
  }

  // Reveal the points for the current ticket and generate the wining card
  async revealPointsInTicket(room: string) {
    try {
      const ticketData = await TicketModel.findOneAndUpdate(
        {
          room: room,
        },
        { $set: { revealed: true } },
        { new: true }
      ).exec();

      const docsLength = await PointModel.countDocuments({ room: room });

      // generate the average point
      const average = Math.round(ticketData!.totalPoints / docsLength);

      // use average to generate fibonacci sequence range from 1 - the average
      const generatedFibo = generateFibonacci(average);
    
      // get the last generated fibonacci number from the array above
      const total = generatedFibo[generatedFibo.length - 1];

      // get the initial generated fibonacci numbers from database
      const winingFibonacci = await RoomModel.find({})
        .select("fibonacci")
        .lean()
        .exec();

        // find match with the last number generated and the initial fibonacci array
      const winingDetails = winingFibonacci[0].fibonacci.find(
        (p) => p.number === total
      );

      const winingPoint = {
        ...winingDetails,
        room,
        team: ticketData?.team,
        point: total
      };

      // update ticket with wining point
      await TicketModel.findOneAndUpdate(
        {
          room: room,
        },
        { $set: { winingPoint: [winingPoint] } }
      );

      const reveal = {
        ...winingPoint,
        reveal: ticketData?.revealed,
        totalPoints: total,
      };

      return {
        reveal,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}

export default Ticket;
