import UserSchema, { initializeUserSchema } from './User';
import WorkspaceSchema, { initializeWorkspaceSchema } from './Workspace';
import BoardSchema, { initializeBoardSchema } from './Board';
import TicketSchema, { initializeTicketSchema } from './Ticket';
import connectToMongo from '@/lib/connectToMongo';

// Initialize all schemas so references work when populating _id's.
initializeUserSchema();
initializeWorkspaceSchema();
initializeBoardSchema();
initializeTicketSchema();

// Connect to MongoDB.
(async () => {
  await connectToMongo();
})();

export {
  UserSchema as User,
  WorkspaceSchema as Workspace,
  BoardSchema as Board,
  TicketSchema as Ticket,
};
