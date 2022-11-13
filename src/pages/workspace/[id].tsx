import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth/next';
import { AppSession } from 'models/global';
import { authOptions } from '@/auth/[...nextauth]';
import { getWorkspaceById } from 'controllers/workspaceController';
import { useEffect } from 'react';

export default function Workspace_Continued({ mySession, workspace }) {
  const { user }: AppSession = JSON.parse(mySession);
  const workspaceData = JSON.parse(workspace);

  useEffect(() => {
    console.log(user);
    console.log(workspaceData);
  }, []);

  return (
    <>
      <Head>Flow: Workspace Page</Head>
      <p>Workspace Page</p>
    </>
  );
}

export async function getServerSideProps({ req, res, query }) {
  const session: AppSession = await unstable_getServerSession(
    req,
    res,
    authOptions
  );
  const { id } = query;

  if (session) {
    const mySession = JSON.stringify(session);
    const workspace = await getWorkspaceById(id);
    return {
      props: {
        mySession,
        workspace: JSON.stringify(workspace),
      },
    };
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}
