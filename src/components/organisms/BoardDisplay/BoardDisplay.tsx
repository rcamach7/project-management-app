import { Ticket } from 'models/client';
import { Box } from '@mui/material';

interface Props {
  tickets: Ticket[];
}

export default function BoardDisplay({ tickets }: Props) {
  return <Box sx={{ flex: 1 }}></Box>;
}
