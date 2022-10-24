import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/[...nextauth]';
import { Types } from 'mongoose';
import { AppSession } from 'models/global.types';
import { Board, Ticket } from 'schemas';
import { createNewTicket, getAllTickets } from 'controllers/ticketController';

export default async (req, res) => {
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
        const { title, description, boardId, label } = req.body;
        if (!title || !description || !boardId || !label) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        const newTicket = await createNewTicket(title, description, label);
        await Board.findByIdAndUpdate(boardId, {
          $push: { tickets: new Types.ObjectId(newTicket._id) },
        });

        res.json(newTicket);
      } catch (error) {
        res.status(500).json({ message: 'Error creating board', error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
