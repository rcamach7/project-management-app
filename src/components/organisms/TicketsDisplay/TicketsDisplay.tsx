import { Ticket } from 'models/client';
import { Box } from '@mui/material';

interface Props {
  tickets: Ticket[];
}

export default function TicketsDisplay({ tickets }: Props) {
  return <Box sx={{ flex: 1 }}></Box>;
}
