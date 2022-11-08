import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, CssBaseline } from '@mui/material/';
import theme from '../theme';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <CssBaseline />
      </ThemeProvider>
    </SessionProvider>
  );
}
