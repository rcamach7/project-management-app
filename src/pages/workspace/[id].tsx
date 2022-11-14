import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth/next';
import { AppSession } from 'models/global';
import { authOptions } from '@/auth/[...nextauth]';
import { getWorkspaceById } from 'controllers/workspaceController';
import { ResponsiveAppBar } from '@/components/organisms/index';
import { Workspace } from 'models/client';
import { Box } from '@mui/material';

export default function Workspace_Continued({ mySession, workspace }) {
  const { user }: AppSession = JSON.parse(mySession);
  const { _id, boards, description, owner, users }: Workspace =
    JSON.parse(workspace);

  return (
    <>
      <Head>Flow: Workspace Page</Head>
      <Box
        sx={{
          minWidth: '100vw',
          minHeight: '100vh',
          maxWidth: '900px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ResponsiveAppBar name={user.name} image={user.image} />
      </Box>
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
