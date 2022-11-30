import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/auth/[...nextauth]';
import { Types } from 'mongoose';
import { AppSession } from 'models/global';
import { Workspace } from 'schemas';
import { createNewBoard } from 'controllers/boardController';

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
        const { title, description, workspace_id } = req.body;
        if (!title || !description || !workspace_id) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create new board, then add board to the workspace.
        const newBoard = await createNewBoard(title, description, workspace_id);
        await Workspace.findByIdAndUpdate(workspace_id, {
          $push: { boards: new Types.ObjectId(newBoard._id) },
        });

        res.json(newBoard);
      } catch (error) {
        res.status(500).json({ message: 'Error creating board', error });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
