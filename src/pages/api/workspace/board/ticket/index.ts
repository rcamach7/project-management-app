import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/auth/[...nextauth]';
import { Types } from 'mongoose';
import { AppSession } from 'models/global';
import { Board } from 'schemas';
import { createNewTicket } from 'controllers/ticketController';

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

  switch (req.method) {
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
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
