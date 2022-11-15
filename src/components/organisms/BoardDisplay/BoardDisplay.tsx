import { Board } from 'models/client';
import { Box } from '@mui/material';

interface Props {
  board: Board;
}

export default function BoardDisplay({ board }: Props) {
  return <Box sx={{ flex: 1, background: '#112240' }}>Board Display</Box>;
}
