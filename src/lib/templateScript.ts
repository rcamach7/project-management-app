import { createNewBoard } from 'controllers/boardController';
import { createNewTicket } from 'controllers/ticketController';
import { createNewWorkspace } from 'controllers/workspaceController';

export const templateOptions = ['software project', 'basic'];
export const createTemplate = async (template: string, userId: string) => {
  template = template.toLowerCase();

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

        const backlogBoard = await createNewBoard(
          'Backlog',
          'Backlog of tickets',
          workspace._id
        );
        await createNewTicket(
          backlogBoard._id,
          'Tasks or features to work on in the future',
          'Backlog tickets can include new features, bug fixes, and other tasks that need to be completed on in the future',
          ['CHORE']
        );

        const todoBoard = await createNewBoard(
          'To Do',
          'Tickets awaiting to be worked on',
          workspace._id
        );
        await createNewTicket(
          todoBoard._id,
          'Tasks or features not yet started',
          'To do tickets can include new features, bug fixes, improvements to existing functionality, that need to be completed but have not yet been started',
          ['FEAT']
        );

        const inProgressBoard = await createNewBoard(
          'In Progress',
          'Tickets currently in progress',
          workspace._id
        );
        await createNewTicket(
          inProgressBoard._id,
          'Tasks or features currently being worked on',
          'In progress tickets can include new features, bug fixes, improvements to existing functionality, that are currently being worked on',
          ['WIP']
        );

        const doneBoard = await createNewBoard(
          'Done',
          'Tickets that are done',
          workspace._id
        );
        await createNewTicket(
          doneBoard._id,
          'Tasks or features that are done',
          'Done tickets can include new features, bug fixes, improvements to existing functionality, that are done',
          []
        );
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
