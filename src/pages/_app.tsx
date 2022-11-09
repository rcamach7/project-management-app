import { SessionProvider } from 'next-auth/react';
import theme from '../theme';
import { ThemeProvider, CssBaseline } from '@mui/material/';
import { Provider } from 'react-redux';
import { store } from '@/features/index';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <CssBaseline />
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
