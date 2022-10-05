import { unstable_getServerSession } from 'next-auth/next';
import mongoose from 'mongoose';
import { authOptions } from './auth/[...nextauth]';
import { createNewWorkspace } from '../../controllers/workspaceController';

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) res.status(401).json({ message: 'Unauthorized' });

  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const newWorkspace = {
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name ? req.body.name : 'Untitled Workspace',
          description: req.body.description ? req.body.description : '',
          users: [],
          boards: [],
        };
        const workspace = await createNewWorkspace(newWorkspace);

        res.json({ workspace });
      } catch (error) {
        res.status(500).json({ message: 'Error creating workspace', error });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
