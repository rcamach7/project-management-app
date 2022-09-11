import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { addWorkspaceToUser } from '../../../controllers/userController';

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) res.status(401).json({ message: 'Unauthorized' });

  const { method } = req;
  switch (method) {
    case 'PUT':
      try {
        const user = await addWorkspaceToUser(
          session.user.email,
          req.body.workspace_id
        );
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving user' });
      }
      break;
    default:
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
