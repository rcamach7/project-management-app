import { createNewBoard } from 'controllers/boardController';
import { createNewTicket } from 'controllers/ticketController';
import { createNewWorkspace } from 'controllers/workspaceController';
import { Board, Workspace } from 'schemas';
import { Types } from 'mongoose';

export const templateOptions = ['software project', 'basic'];
export const createTemplate = async (template: string, userId: string) => {
  try {
    switch (template) {
      case 'software project':
        const workspace = await createNewWorkspace(
          {
            name: 'Software Project',
            description: 'A basic template for building software projects',
          },
          userId
        );

        // Backlog board
        const backlogBoard = await createNewBoard(
          'Backlog',
          'Backlog of tickets',
          workspace._id
        );
        const backlogTicket = await createNewTicket(
          backlogBoard._id,
          'Tasks or features to work on in the future',
          'Backlog tickets can include new features, bug fixes, and other tasks that need to be completed on in the future',
          ['CHORE']
        );
        await Workspace.findByIdAndUpdate(workspace._id, {
          $push: { boards: new Types.ObjectId(backlogBoard._id) },
        });
        await Board.findByIdAndUpdate(backlogBoard._id, {
          $push: { tickets: new Types.ObjectId(backlogTicket._id) },
        });

        // To do board
        const todoBoard = await createNewBoard(
          'To Do',
          'Tickets awaiting to be worked on',
          workspace._id
        );
        const todoTicket = await createNewTicket(
          todoBoard._id,
          'Tasks or features not yet started',
          'To do tickets can include new features, bug fixes, improvements to existing functionality, that need to be completed but have not yet been started',
          ['FEAT']
        );
        await Workspace.findByIdAndUpdate(workspace._id, {
          $push: { boards: new Types.ObjectId(todoBoard._id) },
        });
        await Board.findByIdAndUpdate(todoBoard._id, {
          $push: { tickets: new Types.ObjectId(todoTicket._id) },
        });

        // In progress board
        const inProgressBoard = await createNewBoard(
          'In Progress',
          'Tickets currently in progress',
          workspace._id
        );
        const inProgressTicket = await createNewTicket(
          inProgressBoard._id,
          'Tasks or features currently being worked on',
          'In progress tickets can include new features, bug fixes, improvements to existing functionality, that are currently being worked on',
          ['WIP']
        );
        await Workspace.findByIdAndUpdate(workspace._id, {
          $push: { boards: new Types.ObjectId(inProgressBoard._id) },
        });
        await Board.findByIdAndUpdate(inProgressBoard._id, {
          $push: { tickets: new Types.ObjectId(inProgressTicket._id) },
        });

        // Done board
        const doneBoard = await createNewBoard(
          'Done',
          'Tickets that are done',
          workspace._id
        );
        const doneTicket = await createNewTicket(
          doneBoard._id,
          'Tasks or features that are done',
          'Done tickets can include new features, bug fixes, improvements to existing functionality, that are done',
          []
        );
        await Workspace.findByIdAndUpdate(workspace._id, {
          $push: { boards: new Types.ObjectId(doneBoard._id) },
        });
        await Board.findByIdAndUpdate(doneBoard._id, {
          $push: { tickets: new Types.ObjectId(doneTicket._id) },
        });

        break;

      case 'basic':
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
};
