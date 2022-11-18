import {
  Ticket as TicketType,
  BoardFormStatus,
  LabelsEnum,
} from 'models/client';
import { Box } from '@mui/material';
import { default as TicketComponent } from './Ticket';

interface Props {
  tickets: TicketType[];
  handleTicketDelete: (ticketId: string) => void;
  handleTicketFormAction: (
    action: BoardFormStatus['action'],
    title: string,
    description: string,
    labels?: LabelsEnum[],
    boardId?: string,
    ticketId?: string
  ) => void;
}

export default function TicketsDisplay({
  tickets,
  handleTicketDelete,
  handleTicketFormAction,
}: Props) {
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
          handleTicketFormAction={handleTicketFormAction}
        />
      ))}
    </Box>
  );
}
