import { Board } from 'schemas';

export const getBoardById = async (_id: string) => {
  try {
    const board = await Board.findById(_id);
    return board;
  } catch (error) {
    console.error('Error retrieving board: ', error);
    return Promise.reject(error);
  }
};
