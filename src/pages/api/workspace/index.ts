import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/auth/[...nextauth]';
import {
  createNewWorkspace,
  getUserWorkspaces,
} from 'controllers/workspaceController';
import { AppSession } from 'models/global';

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

  const { name, description } = req.body;
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const workspaces = await getUserWorkspaces(session.user._id);

        res.json(workspaces);
      } catch (error) {
        res.status(500).json({ message: 'Error getting workspaces', error });
      }
      break;

    case 'POST':
      try {
        const workspace = await createNewWorkspace(
          {
            name: name ? name : 'Untitled Workspace',
            description: description ? description : '',
          },
          session.user._id
        );

        res.json(workspace);
      } catch (error) {
        res.status(500).json({ message: 'Error creating workspace', error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
