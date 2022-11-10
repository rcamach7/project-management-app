import Head from 'next/head';
import { Feature } from 'models/client.models';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { AppSession } from 'models/global.types';
import { useSession } from 'next-auth/react';
import { Box, Unstable_Grid2 as Grid } from '@mui/material';
import {
  PageTitle,
  FeatureCard,
  ActionButton,
  CenteredBox,
} from '@/components/index';

export async function getStaticProps() {
  return {
    props: {
      featuresList: [
        {
          image: 'https://placekitten.com/300/300',
          title: 'Feature 1',
          description: 'This is a description of feature 1',
        },
        {
          image: 'https://placekitten.com/300/300',
          title: 'Feature 2',
          description: 'This is a description of feature 2',
        },
        {
          image: 'https://placekitten.com/300/300',
          title: 'Feature 3',
          description: 'This is a description of feature 3',
        },
        {
          image: 'https://placekitten.com/300/300',
          title: 'Feature 4',
          description: 'This is a description of feature 4',
        },
      ],
    },
  };
}

interface Props {
  featuresList: Feature[];
}

export default function Home({ featuresList }: Props) {
  const { data: session }: { data: AppSession } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/me');
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Flow: Sign In</title>
      </Head>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 1.5,
          minHeight: '100vh',
        }}
      >
        <CenteredBox flex={1}>
          <PageTitle
            subheading="Collaborative Project Management Tool"
            image="/flow.svg"
          />
        </CenteredBox>

        <CenteredBox flex={1} padding="1em 0 0 0">
          <ActionButton
            text="Get Started"
            variant="outlined"
            onClick={signIn}
          />
        </CenteredBox>

        <Grid
          container
          spacing={{ sm: 1, md: 3, lg: 6 }}
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
