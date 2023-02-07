import Head from 'next/head';
import { Feature } from 'models/client';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { PageTitle, FeatureCard, ActionButton } from '@/components/atoms/index';
import { CenteredBox } from '@/components/layout/index';

interface Props {
  featuresList: Feature[];
}

export default function Home({ featuresList }: Props) {
  const { data: session } = useSession();
  const { push } = useRouter();

  const handleSignIn = () => {
    if (session) {
      push('/me');
    } else {
      signIn('google', { callbackUrl: '/me' });
    }
  };

  return (
    <>
      <Head>
        <title>Flow: Home</title>
        <link rel="icon" href="/hero/flow_letter.svg" />
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
            subheading="Take your organization and teamwork to the next level with Flow, a powerful project management tool."
            additionalText="Built with the latest technologies like Next.js, TypeScript, Material-UI, and MongoDB, Flow ensures seamless authentication with NextAuth. And the best part? It's all hosted on Vercel for easy access and use."
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
            Sign in using Google by clicking the link below.
          </Typography>
          <ActionButton
            text="Get Started"
            variant="outlined"
            onClick={handleSignIn}
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
              <FeatureCard key={feature.title} index={i} {...feature} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      featuresList: [
        {
          image: '/features/organized.svg',
          title: 'Organization',
          description:
            'Organize your projects with ease by creating workspaces, boards, and tickets',
        },
        {
          image: '/features/collaborate.svg',
          title: 'Collaboration',
          description:
            'Collaborate with your team seamlessly on projects and tasks',
        },
        {
          image: '/features/productivity.svg',
          title: 'Productivity',
          description: 'Boost your productivity with Flow',
        },
        {
          image: '/features/accessible.svg',
          title: 'Accessibility',
          description:
            'Stay on top of your projects and tasks, no matter where you are',
        },
      ],
    },
  };
}
