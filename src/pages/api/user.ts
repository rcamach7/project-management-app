import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './auth/[...nextauth]';
import { getUserById } from 'controllers/userController';
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

  switch (req.method) {
    case 'GET':
      try {
        const user = await getUserById(session.user._id);
        res.json({ user });
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
