import Head from 'next/head';
import { authOptions } from '@/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import { AppSession } from 'models/global';
import { CenteredBox, ProfileBar, ImageButton } from '@/components/index';
import { Box } from '@mui/material';

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
        }}
      >
        <ProfileBar user={user} />
        <CenteredBox
          sx={{ p: 3, flexDirection: 'row', justifyContent: 'space-evenly' }}
        >
          <ImageButton
            text="New Project"
            image="/plus.svg"
            onClick={() => alert('clicked on new project')}
          />
          <ImageButton
            text="Invitations"
            image="/invite.svg"
            onClick={() => alert('clicked on invitations')}
          />
          <ImageButton
            text="Templates"
            image="/template.svg"
            onClick={() => alert('clicked on templates')}
          />
        </CenteredBox>
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
