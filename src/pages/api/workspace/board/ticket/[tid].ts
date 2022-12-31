import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/auth/[...nextauth]';
import { AppSession } from 'models/global';
import {
  getTicketById,
  deleteTicketById,
  updateTicketFieldsById,
} from 'controllers/ticketController';

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
        // TODO: Move ticket to another board
        if (board_id) {
          console.log('detected moving ticket to another board');
          // remove ticket id from board
        }

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
