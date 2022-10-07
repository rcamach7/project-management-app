import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import {
  getUserById,
  deleteWorkspaceFromUser,
} from '../../controllers/userController';
import { AppSession } from '../../../models/global.types';

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
        const user = await getUserById(session.user._id);
        res.json({ user });
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error });
      }
      break;
    case 'DELETE':
      try {
        const user = await deleteWorkspaceFromUser(
          session.user._id,
          req.body._id
        );
        res.json({ msg: 'Successfully deleted workspace' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting workspace', error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
