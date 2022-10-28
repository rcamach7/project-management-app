import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/auth/[...nextauth]';
import { Types } from 'mongoose';
import { AppSession } from 'models/global.types';
import { Board } from 'schemas';
import { createNewTicket, getAllTickets } from 'controllers/ticketController';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session: AppSession = await unstable_getServerSession(
    req,
    res,
    authOptions
  );
  if (!session) res.status(401).json({ message: 'Unauthorized' });

  const { method } = req;
  switch (method) {
    // TODO: Delete this endpoint before production - only for testing
    case 'GET':
      try {
        const tickets = await getAllTickets();
        res.json(tickets);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving board', error });
      }
      break;

    case 'POST':
      try {
        const { title, description, board_id, label } = req.body;
        if (!title || !description || !board_id || !label) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        const ticket = await createNewTicket(
          board_id,
          title,
          description,
          label
        );
        await Board.findByIdAndUpdate(board_id, {
          $push: { tickets: new Types.ObjectId(ticket._id) },
        });

        res.json(ticket);
      } catch (error) {
        res.status(500).json({ message: 'Error creating ticket', error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
