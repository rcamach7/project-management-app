import { Ticket as TicketType } from 'models/client';
import { Box } from '@mui/material';
import { default as TicketComponent } from './Ticket';

interface Props {
  tickets: TicketType[];
  handleTicketDelete: (ticketId: string) => void;
}

export default function TicketsDisplay({ tickets, handleTicketDelete }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        p: 2,
        gap: { xs: 1, sm: 2, md: 3 },
        overflow: 'scroll',
      }}
    >
      {tickets.map((ticket) => (
        <TicketComponent
          key={ticket._id}
          ticket={ticket}
          handleTicketDelete={handleTicketDelete}
        />
      ))}
    </Box>
  );
}
