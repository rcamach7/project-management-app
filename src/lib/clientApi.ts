import axios from 'axios';
import { Board, LabelsEnum, Ticket } from 'models/client';

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

export const createBoard = async (
  title: string,
  description: string,
  workspace_id: string
) => {
  try {
    const body = {
      title,
      description,
      workspace_id,
    };
    const res = await axios.post(`/api/workspace/board`, body);
    return res.data as Board;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateBoard = async (
  title: string,
  description: string,
  _id: string
) => {
  try {
    const body = {
      title,
      description,
    };
    const res = await axios.put(`/api/workspace/board/${_id}`, body);
    return res.data as Board;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateTicket = async (
  title: string,
  description: string,
  labels: LabelsEnum[],
  ticket_id: string
) => {
  try {
    const body = {
      title,
      description,
      labels,
    };
    const res = await axios.put(
      `/api/workspace/board/ticket/${ticket_id}`,
      body
    );
    return res.data as Ticket;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  deleteBoardByID,
  deleteTicketByID,
  createBoard,
  updateBoard,
  updateTicket,
};
