import { authOptions } from '@/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import { getUserWorkspaces } from 'controllers/workspaceController';
import { AppSession } from 'models/global';

export default function Me({ mySession, workspaces }) {
  const { user } = JSON.parse(mySession);
  workspaces = JSON.parse(workspaces);

  return 'User is logged in';
}

export async function getServerSideProps({ req, res }) {
  const session: AppSession = await unstable_getServerSession(
    req,
    res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } else {
    const mySession = JSON.stringify(session);
    const myWorkspaces = JSON.stringify(
      await getUserWorkspaces(session.user._id)
    );
    return {
      props: {
        mySession,
        workspaces: myWorkspaces,
      },
    };
  }
}
