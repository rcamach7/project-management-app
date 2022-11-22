import Head from 'next/head';
import { Feature } from 'models/client';
import { signIn } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/[...nextauth]';
import { Box, Unstable_Grid2 as Grid } from '@mui/material';
import { PageTitle, FeatureCard, ActionButton } from '@/components/atoms/index';
import { CenteredBox } from '@/components/layout/index';

interface Props {
  featuresList: Feature[];
}

export default function Home({ featuresList }: Props) {
  return (
    <>
      <Head>
        <title>Flow: Home</title>
        <link rel="icon" href="/hero/f.svg" />
      </Head>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 1.5,
          minHeight: '100vh',
          maxWidth: '1000px',
        }}
      >
        <CenteredBox flex={1}>
          <PageTitle
            subheading="Manage your software projects and tasks by creating workspaces, boards, and tickets!"
            image="/hero/flow.svg"
          />
        </CenteredBox>

        <CenteredBox flex={1} sx={{ padding: '1em 0 0 0' }}>
          <ActionButton
            text="Get Started"
            variant="outlined"
            onClick={signIn}
            sx={{
              fontSize: { xs: '.9em', sm: '1em', md: '1.2em' },
              color: 'secondary.main',
              border: 1,
              borderColor: 'secondary.main',
              p: '2px 4px',
            }}
          />
        </CenteredBox>

        <Grid
          container
          spacing={{ sm: 1, md: 3 }}
          justifyContent="space-evenly"
          sx={{ flex: 2, p: 1 }}
        >
          {featuresList.map((feature, i) => (
            <Grid key={i} xs={5} md={4} lg={3}>
              <FeatureCard key={feature.title} {...feature} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/me',
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        featuresList: [
          {
            image: '/features/organized.svg',
            title: 'Organization',
            description:
              'Create workspaces, boards, and tickets to organize your projects.',
          },
          {
            image: '/features/collaborate.svg',
            title: 'Feature 2',
            description: 'This is a description of feature 2',
          },
          {
            image: '/features/productivity.svg',
            title: 'Feature 3',
            description: 'This is a description of feature 3',
          },
          {
            image: '/features/accessible.svg',
            title: 'Feature 4',
            description: 'This is a description of feature 4',
          },
        ],
      },
    };
  }
}
