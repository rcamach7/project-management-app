import UserSchema, { initializeUserSchema } from './User';
import WorkspaceSchema, { initializeWorkspaceSchema } from './Workspace';
import BoardSchema, { initializeBoardSchema } from './Board';
import TicketSchema, { initializeCardSchema } from './Ticket';
import connectToMongo from '@/lib/connectToMongo';

// Initialize all schemas so references work when populating _id's.
initializeUserSchema();
initializeWorkspaceSchema();
initializeBoardSchema();
initializeCardSchema();

// Connect to MongoDB.
connectToMongo();

export {
  UserSchema as User,
  WorkspaceSchema as Workspace,
  BoardSchema as Board,
  TicketSchema as Ticket,
};
