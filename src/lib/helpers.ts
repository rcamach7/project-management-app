import { Workspace, Board, Ticket } from 'models/client';
import { AppSession, WorkspaceSummary } from 'models/global';

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

export const updateTicketInWorkspace = (
  workspace: Workspace,
  ticket: Ticket
) => {
  const newWorkspace: Workspace = { ...workspace };
  newWorkspace.boards.forEach((board) => {
    board.tickets = board.tickets.map((t) =>
      t._id === ticket._id ? ticket : t
    );
  });
  return newWorkspace;
};

export const addTicketToWorkspaceBoard = (
  workspace: Workspace,
  ticket: Ticket
) => {
  const newWorkspace: Workspace = { ...workspace };
  newWorkspace.boards = newWorkspace.boards.map((board) => {
    if (board._id === ticket.board_id) {
      board.tickets.push(ticket);
    }
    return board;
  });
  return newWorkspace;
};

export const addWorkspaceToUserSession = (
  session: AppSession,
  workspace: WorkspaceSummary
) => {
  const newSession: AppSession = { ...session };
  newSession.user.workspaces.push(workspace);
  return newSession;
};

const updateWorkspaceInUserSession = (
  session: AppSession,
  workspace: WorkspaceSummary
) => {
  const newSession: AppSession = { ...session };
  newSession.user.workspaces = newSession.user.workspaces.map((w) =>
    w._id === workspace._id ? workspace : w
  );
  return newSession;
};

const deleteWorkspaceFromUserSession = (
  session: AppSession,
  workspaceId: string
) => {
  const newSession: AppSession = { ...session };
  newSession.user.workspaces = newSession.user.workspaces.filter(
    (w) => w._id !== workspaceId
  );
  return newSession;
};

export default {
  deleteTicketFromWorkspace,
  addBoardToWorkspace,
  updateBoardInWorkspace,
  deleteBoardFromWorkspace,
  updateTicketInWorkspace,
  addTicketToWorkspaceBoard,
  addWorkspaceToUserSession,
  updateWorkspaceInUserSession,
  deleteWorkspaceFromUserSession,
};
