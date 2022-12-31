import { Board } from 'schemas';
import { Types } from 'mongoose';

/**
 * GET Controllers
 */

export const getBoardById = async (_id: string) => {
  try {
    const board = await Board.findOne({ _id });
    return board;
  } catch (error) {
    console.error('Error retrieving board: ', error);
    return Promise.reject(error);
  }
};

/**
 * PUT Controllers
 */

export const updateBoardDescriptionById = async (
  _id: string,
  fields: { title?: string; description?: string }
) => {
  try {
    const board = await Board.findByIdAndUpdate(
      _id,
      { $set: fields },
      { new: true }
    ).populate({
      path: 'tickets',
      model: 'Ticket',
    });
    return board;
  } catch (error) {
    console.error('Error updating board: ', error);
    return Promise.reject(error);
  }
};

export const removeTicketFromBoard = async (
  board_id: string,
  ticket_id: string
) => {
  try {
    const board = await Board.findByIdAndUpdate(
      board_id,
      { $pull: { tickets: ticket_id } },
      { new: true }
    ).populate({
      path: 'tickets',
      model: 'Ticket',
    });
    return board;
  } catch (error) {
    console.error('Error removing ticket from board: ', error);
    return Promise.reject(error);
  }
};

export const addTicketToBoard = async (board_id: string, ticket_id: string) => {
  try {
    const board = await Board.findByIdAndUpdate(
      board_id,
      { $push: { tickets: ticket_id } },
      { new: true }
    ).populate({
      path: 'tickets',
      model: 'Ticket',
    });
    return board;
  } catch (error) {
    console.error('Error adding ticket to board: ', error);
    return Promise.reject(error);
  }
};

/**
 * POST Controllers
 */

export const createNewBoard = async (
  title: string,
  description: string,
  workspace_id: string
) => {
  try {
    const newBoard = new Board({
      workspace_id: new Types.ObjectId(workspace_id),
      title,
      description,
      tickets: [],
    });
    await newBoard.save();

    return newBoard;
  } catch (error) {
    console.error('Error creating board: ', error);
    return Promise.reject(error);
  }
};

/**
 * DELETE Controllers
 */

export const deleteBoardById = async (_id: string) => {
  try {
    const board = await Board.findOneAndDelete({ _id });
    return board;
  } catch (error) {
    console.error('Error deleting board: ', error);
    return Promise.reject(error);
  }
};
