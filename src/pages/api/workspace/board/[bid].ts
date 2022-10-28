import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/auth/[...nextauth]';
import { AppSession } from 'models/global.types';
import {
  updateBoardDescriptionById,
  getBoardById,
  deleteBoardById,
} from 'controllers/boardController';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session: AppSession = await unstable_getServerSession(
    req,
    res,
    authOptions
  );
  if (!session) res.status(401).json({ message: 'Unauthorized' });

  const { bid } = req.query;
  if (!bid || Array.isArray(bid))
    return res.status(400).json({ message: 'Missing board id' });

  const { method } = req;
  switch (method) {
    case 'GET':
      try {
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
        const board = await updateBoardDescriptionById(bid, {
          title,
          description,
        });
        res.json(board);
      } catch (error) {
        res.status(500).json({ msg: 'Error updating board', error });
      }
      break;
    case 'DELETE':
      try {
        const board = await deleteBoardById(bid);
        res.json(board);
      } catch (error) {
        res.status(500).json({ msg: 'Error updating board', error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
