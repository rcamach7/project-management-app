import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/auth/[...nextauth]';
import { AppSession } from 'models/global';
import { templateOptions, createTemplate } from '@/lib/templateScript';

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

  let { template } = req.body;
  template = template.toLowerCase();
  if (!template || templateOptions.indexOf(template) === -1) {
    res
      .status(400)
      .json({ message: `Invalid or missing template: ${template}` });
  }

  switch (req.method) {
    case 'POST':
      try {
        await createTemplate(template, session.user._id);
      } catch (error) {
        res.status(500).json({ message: 'Error generating template', error });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
