import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  updateGeneralWorkspaceDetails,
  getWorkspaceById,
  deleteWorkspace,
} from 'controllers/workspaceController';
import { authOptions } from '@/auth/[...nextauth]';
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

  const { wid } = req.query;
  if (!wid || Array.isArray(wid))
    return res.status(400).json({ message: 'Missing valid workspace Id' });

  const { name, description } = req.body;
  switch (req.method) {
    case 'GET':
      try {
        const workspace = await getWorkspaceById(wid);
        res.json(workspace);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving workspace', error });
      }
      break;

    case 'PUT':
      try {
        if (!name && !description)
          return res.status(400).json({ message: 'No fields to update' });

        const workspace = await updateGeneralWorkspaceDetails(wid, {
          name: name ? name : '',
          description: description ? description : '',
        });

        res.json(workspace);
      } catch (error) {
        res.status(500).json({
          message: 'Error updating general information for workspace',
          error,
        });
      }
      break;

    case 'DELETE':
      try {
        const workspaceToDelete = await getWorkspaceById(wid);
        if (workspaceToDelete.owner._id.toString() !== session.user._id) {
          return res.status(401).json({
            message: 'You are not authorized to delete this workspace',
          });
        }

        const workspace = await deleteWorkspace(wid);
        res.json(workspace);
      } catch (error) {
        res.status(500).json({
          message: 'Error ocurred deleting workspace',
          error,
        });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
