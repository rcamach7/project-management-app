import { createNewBoard } from 'controllers/boardController';
import { createNewTicket } from 'controllers/ticketController';

export const templateOptions = ['software project', 'basic'];
export const createTemplate = async (template: string, workspaceId: string) => {
  template = template.toLowerCase();
  switch (template) {
    case 'software project':
      const backlogBoard = await createNewBoard(
        'Backlog',
        'Backlog of tickets',
        workspaceId
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
        workspaceId
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
        workspaceId
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
        workspaceId
      );
      await createNewTicket(
        doneBoard._id,
        'Tasks or features that are done',
        'Done tickets can include new features, bug fixes, improvements to existing functionality, that are done',
        []
      );
      break;

    case 'basic':
      await createNewBoard(
        'To Do',
        'Tickets that need to be done',
        workspaceId
      );
      await createNewBoard('Done', 'Tickets that are done', workspaceId);
      break;
    default:
      break;
  }
};
