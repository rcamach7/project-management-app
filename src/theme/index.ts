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
      return '#ffffff';
    case LabelsEnum.FEAT:
      return '#c7d903';
    case LabelsEnum.REFACTOR:
      return '#f6ffb5';
    case LabelsEnum.TEST:
      return '#f0fc03';
    case LabelsEnum.PERF:
      return '#fc0303';
    case LabelsEnum.STYLE:
      return '#00BB2D';
    case LabelsEnum.ASSET:
      return '#03f8fc';
    case LabelsEnum.DOC:
      return '#b5bfff';
    case LabelsEnum.CI:
      return '#0f42db';
    case LabelsEnum.CHORE:
      return '#ffd9b5';
    case LabelsEnum.WIP:
      return '#0af1d5';
    default:
      return '#F3C610';
  }
};

export default theme;
