import axios from 'axios';

export const deleteTicketByID = async (id: string) => {
  try {
    await axios.delete(`/api/workspace/board/ticket/${id}`);
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};
