import { createNewBoard } from 'controllers/boardController';

export const templateOptions = ['software project', 'basic'];
export const createTemplate = async (template: string, workspaceId: string) => {
  template = template.toLowerCase();
  switch (template) {
    case 'software project':
      await createNewBoard('Backlog', 'Backlog of tickets', workspaceId);
      await createNewBoard(
        'To Do',
        'Tickets awaiting to be worked on',
        workspaceId
      );
      await createNewBoard(
        'In Progress',
        'Tickets currently in progress',
        workspaceId
      );
      await createNewBoard('Done', 'Tickets that are done', workspaceId);
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
