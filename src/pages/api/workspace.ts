import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import {
  createNewWorkspace,
  updateGeneralWorkspaceDetails,
  getWorkspaceById,
  deleteWorkspace,
} from '@/controllers/workspaceController';
import { AppSession } from 'models/global.types';

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
      try {
        const workspace = await createNewWorkspace(
          {
            name: req.body.name ? req.body.name : 'Untitled Workspace',
            description: req.body.description ? req.body.description : '',
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
        const workspace = await updateGeneralWorkspaceDetails(req.body._id, {
          name: req.body.name ? req.body.name : '',
          description: req.body.description ? req.body.description : '',
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
        const workspaceToDelete = await getWorkspaceById(req.body._id);
        if (workspaceToDelete.owner.toString() !== session.user._id) {
          res.status(401).json({
            message: 'You are not authorized to delete this workspace',
          });
        }

        const workspace = await deleteWorkspace(req.body._id);
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
