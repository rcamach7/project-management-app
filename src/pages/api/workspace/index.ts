import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/auth/[...nextauth]';
import {
  createNewWorkspace,
  updateGeneralWorkspaceDetails,
  getWorkspaceById,
  deleteWorkspace,
} from 'controllers/workspaceController';
import { AppSession } from 'models/global.types';
import { Workspace } from 'schemas';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session: AppSession = await unstable_getServerSession(
    req,
    res,
    authOptions
  );
  if (!session) res.status(401).json({ message: 'Unauthorized' });

  const { name, description, _id } = req.body;
  const { method } = req;
  switch (method) {
    // TODO: Delete this endpoint before production - only for testing
    case 'GET':
      try {
        const workspaces = await Workspace.find();

        res.json(workspaces);
      } catch (error) {
        res.status(500).json({ message: 'Error getting workspaces', error });
      }
      break;

    case 'POST':
      try {
        // const { name, description } = req.body;
        const workspace = await createNewWorkspace(
          {
            name: name ? name : 'Untitled Workspace',
            description: description ? description : '',
          },
          session.user._id
        );

        res.json({ workspace });
      } catch (error) {
        res.status(500).json({ message: 'Error creating workspace', error });
      }
      break;
    case 'PUT':
      try {
        const workspace = await updateGeneralWorkspaceDetails(_id, {
          name: name ? name : '',
          description: description ? description : '',
        });

        res.json({ workspace });
      } catch (error) {
        res.status(500).json({
          message: 'Error updating general information for workspace',
          error,
        });
      }
      break;
    case 'DELETE':
      try {
        const workspaceToDelete = await getWorkspaceById(_id);
        if (workspaceToDelete.owner.toString() !== session.user._id) {
          res.status(401).json({
            message: 'You are not authorized to delete this workspace',
          });
        }

        const workspace = await deleteWorkspace(_id);
        res.json({ workspace });
      } catch (error) {
        res.status(500).json({
          message: 'Error ocurred deleting workspace',
          error,
        });
      }
      break;
    default:
      res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
