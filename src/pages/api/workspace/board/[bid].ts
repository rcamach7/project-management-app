import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/[...nextauth]';
import { AppSession } from 'models/global.types';
import {
  updateBoardDescriptionById,
  getBoardById,
} from 'controllers/boardController';

export default async (req, res) => {
  const session: AppSession = await unstable_getServerSession(
    req,
    res,
    authOptions
  );
  if (!session) res.status(401).json({ message: 'Unauthorized' });

  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const { bid } = req.query;
        const board = await getBoardById(bid);
        res.json(board);
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    case 'PUT':
      const { title, description } = req.body;
      if (!title && !description) {
        return res.status(400).json({
          message: 'Please provide at least one board field to update',
        });
      }
      try {
        const updatedBoard = await updateBoardDescriptionById(req.query.bid, {
          title,
          description,
        });
        res.json({ board: updatedBoard });
      } catch (error) {
        res.status(500).json({ msg: 'Error updating board', error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
