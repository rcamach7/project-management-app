import { SessionProvider } from 'next-auth/react';
import theme from '../theme';
import { ThemeProvider, CssBaseline } from '@mui/material/';
import { Layout } from '@/components/layout/index';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Layout>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <CssBaseline />
        </ThemeProvider>
      </SessionProvider>
    </Layout>
  );
}
