import { Workspace } from 'models/client';

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
