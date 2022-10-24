import { Board } from 'schemas';

/**
 * GET Controllers
 */

export const getBoardById = async (_id: string) => {
  try {
    const board = await Board.findById(_id);
    return board;
  } catch (error) {
    console.error('Error retrieving board: ', error);
    return Promise.reject(error);
  }
};

/**
 * POST Controllers
 */

export const createNewBoard = async (title: string, description: string) => {
  try {
    const newBoard = new Board({
      title: title,
      description: description,
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
