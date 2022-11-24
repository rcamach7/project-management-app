import { createTheme } from '@mui/material/styles';
import { LabelsEnum } from 'models/client';

const theme = createTheme({
  palette: {
    primary: {
      light: 'black',
      main: '#FFFFFF',
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

export const getLabelColor = (label: LabelsEnum) => {
  switch (label) {
    case LabelsEnum.BACKEND:
      return '#EFA94A';
    case LabelsEnum.FRONTEND:
      return '#999950';
    case LabelsEnum.FEAT:
      return '#c7d903';
    case LabelsEnum.REFACTOR:
      return '#3B83BD';
    case LabelsEnum.TEST:
      return '#3D642D';
    case LabelsEnum.PERF:
      return '#C35831';
    case LabelsEnum.STYLE:
      return '#0af1d5';
    case LabelsEnum.ASSET:
      return '#6A5F31';
    case LabelsEnum.DOC:
      return '#3F888F';
    case LabelsEnum.CI:
      return '#B44C43';
    case LabelsEnum.CHORE:
      return '#316650';
    case LabelsEnum.WIP:
      return '#00BB2D';
    default:
      return '#F3C610';
  }
};

export default theme;
