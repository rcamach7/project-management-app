import axios from 'axios';
import { Workspace, Board, LabelsEnum, Ticket } from 'models/client';
import { WorkspaceSummary } from 'models/global';

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
  ticket_id: string,
  board_id?: string
) => {
  try {
    const body = {
      title,
      description,
      labels,
      board_id,
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

export const createTicket = async (
  title: string,
  description: string,
  labels: LabelsEnum[],
  board_id: string
) => {
  try {
    const body = {
      title,
      description,
      // TODO: Update Endpoint to accept labels
      label: labels,
      board_id,
    };
    const res = await axios.post(`/api/workspace/board/ticket`, body);
    return res.data as Ticket;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createWorkspace = async (name: string, description: string) => {
  try {
    const body = {
      name,
      description,
    };
    const res = await axios.post(`/api/workspace`, body);
    return res.data as WorkspaceSummary;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const editWorkspace = async (
  name: string,
  description: string,
  _id: string
) => {
  try {
    const body = {
      name,
      description,
    };
    const res = await axios.put(`/api/workspace/${_id}`, body);
    return res.data as WorkspaceSummary;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteWorkspace = async (_id: string) => {
  try {
    await axios.delete(`/api/workspace/${_id}`);
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getWorkspaceById = async (_id: string) => {
  try {
    const res = await axios.get(`/api/workspace/${_id}`);
    return res.data as Workspace;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createWorkspaceFromTemplate = async (template: string) => {
  try {
    const res = await axios.post('/api/workspace/template', { template });
    return res.data as WorkspaceSummary;
  } catch (error) {
    return Promise.reject(error);
  }
};

const clientApi = {
  deleteTicketByID,
  deleteBoardByID,
  createBoard,
  updateBoard,
  updateTicket,
  createTicket,
  createWorkspace,
  editWorkspace,
  deleteWorkspace,
  getWorkspaceById,
  createWorkspaceFromTemplate,
};

export default clientApi;
