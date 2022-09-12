import { unstable_getServerSession } from 'next-auth/next';
import { v4 } from 'uuid';
import { authOptions } from './auth/[...nextauth]';
import { createNewWorkspace } from '../../controllers/workspaceController';
import { AppSession, SWorkspace } from '../../../models/global.types';
import Workspace from '../../../models/Workspace';

export default async (req, res) => {
  const session: AppSession = await unstable_getServerSession(
    req,
    res,
    authOptions
  );
  if (!session) res.status(401).json({ message: 'Unauthorized' });

  const { method } = req;
  switch (method) {
    case 'POST':
      // const newWorkspace: SWorkspace = {
      //   _id: v4(),
      //   name: req.body.name ? req.body.name : 'Untitled Workspace',
      //   description: req.body.description ? req.body.description : '',
      //   users: [session.user._id],
      //   boards: [],
      // };
      const newWorkspace = new Workspace({
        name: req.body.name ? req.body.name : 'Untitled Workspace',
        description: req.body.description ? req.body.description : '',
        users: [session.user._id],
        boards: [],
      });

      const workspace = await createNewWorkspace(newWorkspace);
      res.json({ workspace });

      try {
      } catch (error) {
        res.status(500).json({ message: 'Error creating workspace' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
