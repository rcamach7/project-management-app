import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/[...nextauth]';
import { Types } from 'mongoose';
import { AppSession } from 'models/global.types';
import { Board, Workspace } from 'schemas';
import { createNewBoard } from 'controllers/boardController';

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
        const boards = await Board.find();
        res.json(boards);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving board', error });
      }
      break;

    case 'POST':
      try {
        const { title, description, workspaceId } = req.body;
        if (!title || !description || !workspaceId) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create new board, then add board to the workspace.
        const newBoard = await createNewBoard(title, description);
        await Workspace.findByIdAndUpdate(workspaceId, {
          $push: { boards: new Types.ObjectId(newBoard._id) },
        });

        res.json(newBoard);
      } catch (error) {
        res.status(500).json({ message: 'Error creating board', error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
