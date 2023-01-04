import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/auth/[...nextauth]';
import { AppSession } from 'models/global';
import {
  getTicketById,
  deleteTicketById,
  updateTicketFieldsById,
} from 'controllers/ticketController';
import {
  removeTicketFromBoard,
  addTicketToBoard,
} from 'controllers/boardController';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: AppSession = await unstable_getServerSession(
    req,
    res,
    authOptions
  );
  if (!session) res.status(401).json({ message: 'Unauthorized' });

  const { tid } = req.query;
  if (!tid || Array.isArray(tid))
    return res
      .status(400)
      .json({ message: 'Ticket id is not provided, or valid' });

  switch (req.method) {
    case 'GET':
      try {
        const ticket = await getTicketById(tid);
        res.json(ticket);
      } catch (error) {
        res.status(500).json({ error });
      }
      break;

    case 'PUT':
      const { title, description, labels, board_id } = req.body;
      if (!title && !description && !labels)
        return res.status(400).json({ message: 'Missing required fields' });

      try {
        // If board_id is provided, remove ticket from current board and add to new board
        if (board_id) {
          const currentTicket = await getTicketById(tid);
          await removeTicketFromBoard(currentTicket.board_id, tid);
          await addTicketToBoard(board_id, tid);
        }

        // Update the actual ticket fields
        const ticket = await updateTicketFieldsById(tid, {
          title,
          description,
          labels,
          board_id,
        });
        res.json(ticket);
      } catch (error) {
        res
          .status(500)
          .json({ message: 'Error occurred while updating ticket', error });
      }
      break;

    case 'DELETE':
      try {
        const ticket = await deleteTicketById(tid);
        res.json(ticket);
      } catch (error) {
        res
          .status(500)
          .json({ message: 'Error ocurred deleting ticket from board', error });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
