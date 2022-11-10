import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { AppSession } from 'models/global.types';
import { useSession } from 'next-auth/react';
import { Box, Typography } from '@mui/material';
import { ActionButton } from '@/components/index';

export function getServerSideProps() {
  return {
    props: {},
  };
}

export default function Me({}) {
  const { data: session }: { data: AppSession } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Flow: Me</title>
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>User Page</Typography>
        <ActionButton text="Sign Out" variant="outlined" onClick={signOut} />
      </Box>
    </>
  );
}
