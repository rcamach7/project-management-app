import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/auth/[...nextauth]';
import { AppSession } from 'models/global';
import {
  getTicketById,
  deleteTicketById,
  updateTicketFieldsById,
} from 'controllers/ticketController';

export default async (req: NextApiRequest, res: NextApiResponse) => {
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

  if (!tid)
    return res
      .status(400)
      .json({ message: 'Please provide a valid ticket ID' });

  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const ticket = await getTicketById(tid);
        res.json(ticket);
      } catch (error) {
        res.status(500).json({ error });
      }
      break;

    case 'PUT':
      const { title, description, labels } = req.body;
      if (!title && !description && !labels)
        return res.status(400).json({ message: 'Missing required fields' });

      try {
        const ticket = await updateTicketFieldsById(tid, {
          title,
          description,
          labels,
        });
        res.json(ticket);
      } catch (error) {
        res.status(500).json({ error });
      }
      break;

    case 'DELETE':
      try {
        const ticket = await deleteTicketById(tid);
        res.json(ticket);
      } catch (error) {
        res.status(500).json({ error });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
