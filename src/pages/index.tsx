import Head from 'next/head';
import { Feature } from 'models/client';
import { signIn } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/[...nextauth]';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
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
        <CenteredBox sx={{ flex: { xs: 1, md: 0.5 } }}>
          <PageTitle
            subheading="Organize yourself and your team by taking advantage of this project management tool!"
            additionalText="Flow is built with Next.js, TypeScript, Material-UI, and MongoDB. It uses NextAuth for authentication and is deployed on Vercel."
            image="/hero/flow.svg"
          />
        </CenteredBox>

        <CenteredBox flex={1} sx={{ padding: '1em 0 0 0' }}>
          <Typography
            sx={{
              pb: 1,
              fontWeight: 'bold',
              display: { xs: 'none', md: 'block' },
            }}
          >
            Click the link below to sign in with Google
          </Typography>
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
              'Create workspaces, boards, and tickets to organize your projects',
          },
          {
            image: '/features/collaborate.svg',
            title: 'Collaboration',
            description: 'Collaborate with your team on projects and tasks',
          },
          {
            image: '/features/productivity.svg',
            title: 'Productivity',
            description: 'Increase your productivity with Flow',
          },
          {
            image: '/features/accessible.svg',
            title: 'Accessibility',
            description: 'Access your projects and tasks from anywhere',
          },
        ],
      },
    };
  }
}
