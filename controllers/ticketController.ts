import { Ticket } from 'schemas';
import { Types } from 'mongoose';

/**
 * GET Controllers
 */

export const getAllTickets = async () => {
  try {
    const tickets = await Ticket.find();
    return tickets;
  } catch (error) {
    console.error('Error getting all ticket: ', error);
    return Promise.reject(error);
  }
};

export const getTicketById = async (_id: string) => {
  try {
    const ticket = await Ticket.findById(_id);
    return ticket;
  } catch (error) {
    console.error('Error getting ticket by id: ', error);
    return Promise.reject(error);
  }
};

/**
 * PUT Controllers
 */

export const updateTicketFieldsById = async (
  _id: string,
  fields: { title?: string; description?: string; labels?: string[] }
) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      _id,
      { $set: fields },
      { new: true }
    );
    return ticket;
  } catch (error) {
    console.error('Error updating ticket: ', error);
    return Promise.reject(error);
  }
};

/**
 * POST Controllers
 */

export const createNewTicket = async (
  board_id: string,
  title: string,
  description: string,
  labels: string[]
) => {
  try {
    const newTicket = new Ticket({
      board_id: new Types.ObjectId(board_id),
      title,
      description,
      labels,
    });
    await newTicket.save();

    return newTicket;
  } catch (error) {
    console.error('Error creating ticket: ', error);
    return Promise.reject(error);
  }
};

/**
 * DELETE Controllers
 */

export const deleteTicketById = async (_id: string) => {
  try {
    const ticket = await Ticket.findOneAndDelete({ _id });
    return ticket;
  } catch (error) {
    console.error('Error deleting ticket: ', error);
    return Promise.reject(error);
  }
};
