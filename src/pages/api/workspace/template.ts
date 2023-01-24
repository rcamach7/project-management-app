import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/auth/[...nextauth]';
import { AppSession } from 'models/global';
import { templateOptions } from '../../../lib/template';

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

  const { template } = req.body;
  if (!template || !templateOptions.includes(template)) {
    return res.status(400).json({ message: 'Invalid or missing template' });
  }

  switch (req.method) {
    case 'POST':
      try {
        res.json({ message: 'POST' });
      } catch (error) {
        res.status(500).json({ message: 'Error creating workspace', error });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
