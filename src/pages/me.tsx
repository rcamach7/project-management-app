import Head from 'next/head';
import { authOptions } from '@/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import { AppSession } from 'models/global';
import { ImageButton } from '@/components/atoms/index';
import { ProfileBar, WorkspaceSummary } from '@/components/molecules/index';
import { CenteredBox } from '@/components/layout/index';
import { Box, Typography } from '@mui/material';

export default function Me({ mySession }) {
  const { user }: AppSession = JSON.parse(mySession);

  return (
    <>
      <Head>
        <title>Flow: User Page</title>
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          maxWidth: '900px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ProfileBar user={user} />
        <CenteredBox
          sx={{ p: 3, flexDirection: 'row', justifyContent: 'space-evenly' }}
        >
          <ImageButton
            text="New Project"
            image="/buttons/plus.svg"
            onClick={() => alert('clicked on new project')}
          />
          <ImageButton
            text="Invitations"
            image="/buttons/invite.svg"
            onClick={() => alert('clicked on invitations')}
          />
          <ImageButton
            text="Templates"
            image="/buttons/template.svg"
            onClick={() => alert('clicked on templates')}
          />
        </CenteredBox>

        <Typography textAlign="center" pb={1} sx={{ fontWeight: 'bold' }}>
          My Workspaces
        </Typography>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 1, sm: 2, md: 5, lg: 7 },
            justifyContent: 'center',
            overflow: 'scroll',
          }}
        >
          {user.workspaces.map((workspace) => (
            <WorkspaceSummary key={workspace._id} workspace={workspace} />
          ))}
        </Box>
      </Box>
    </>
  );
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
    return {
      props: {
        mySession,
      },
    };
  }
}
