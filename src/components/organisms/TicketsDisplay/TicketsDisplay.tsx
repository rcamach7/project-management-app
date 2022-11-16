import { Ticket as TicketType } from 'models/client';
import { Box } from '@mui/material';
import { default as TicketComponent } from './Ticket';

interface Props {
  tickets: TicketType[];
}

export default function TicketsDisplay({ tickets }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        p: 2,
        overflow: 'scroll',
      }}
    >
      {tickets.map((ticket) => (
        <TicketComponent key={ticket._id} ticket={ticket} />
      ))}
    </Box>
  );
}
