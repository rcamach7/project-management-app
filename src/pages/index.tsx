import Head from 'next/head';
import { Box } from '@mui/material';
import { PageTitle } from '@/components/index';

export async function getStaticProps() {
  return {
    props: {
      featuresList: [],
    },
  };
}

export default function Home({ featuresList }) {
  return (
    <>
      <Head>
        <title>Flow: Sign In</title>
      </Head>

      <Box>
        <PageTitle
          title="Flow"
          subheading="Collaborative Project Management Tool"
        />
      </Box>
    </>
  );
}
