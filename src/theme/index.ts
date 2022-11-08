import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: 'black',
      main: '#0B1930',
    },
    secondary: {
      main: '#F3C610',
    },
    text: {
      primary: '#C3CDED',
      secondary: '#828DAF',
    },
    background: {
      default: '#0B1930',
      paper: '#112240',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default theme;
