import axios from 'axios';

export const deleteTicketByID = async (id: string) => {
  try {
    await axios.delete(`/api/workspace/board/ticket/${id}`);
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteBoardByID = async (id: string) => {
  try {
    await axios.delete(`/api/workspace/board/${id}`);
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};
