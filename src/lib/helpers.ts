import { Workspace, Board } from 'models/client';

export const deleteTicketFromWorkspace = (
  workspace: Workspace,
  ticketId: string
) => {
  const newWorkspace: Workspace = { ...workspace };
  newWorkspace.boards.forEach((board) => {
    board.tickets = board.tickets.filter((ticket) => ticket._id !== ticketId);
  });

  return newWorkspace;
};

export const addBoardToWorkspace = (workspace: Workspace, board: Board) => {
  const newWorkspace: Workspace = { ...workspace };
  newWorkspace.boards.push(board);
  return newWorkspace;
};

export const updateBoardInWorkspace = (workspace: Workspace, board: Board) => {
  const newWorkspace: Workspace = { ...workspace };
  newWorkspace.boards = newWorkspace.boards.map((b) =>
    b._id === board._id ? board : b
  );
  return newWorkspace;
};

export const deleteBoardFromWorkspace = (
  workspace: Workspace,
  boardId: string
) => {
  const newWorkspace: Workspace = { ...workspace };
  newWorkspace.boards = newWorkspace.boards.filter(
    (board) => board._id !== boardId
  );
  return newWorkspace;
};

export default {
  deleteTicketFromWorkspace,
  addBoardToWorkspace,
  updateBoardInWorkspace,
  deleteBoardFromWorkspace,
};
