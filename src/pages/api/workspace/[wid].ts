import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/auth/[...nextauth]';
import { AppSession } from 'models/global.types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
        res.json({ msg: 'GET request on api/workspace/[wid]/' });
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving workspace', error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
