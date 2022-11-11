import { SessionProvider } from 'next-auth/react';
import theme from '../theme';
import { ThemeProvider, CssBaseline } from '@mui/material/';

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
