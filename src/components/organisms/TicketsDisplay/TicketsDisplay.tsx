import { useState } from 'react';
import {
  Ticket as TicketType,
  BoardFormStatus,
  LabelsEnum,
} from 'models/client';
import { Box } from '@mui/material';
import { TicketForm } from '@/components/molecules/index';
import { default as TicketComponent } from './Ticket';

interface Props {
  boardId: string;
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
  boardId,
  tickets,
  handleTicketDelete,
  handleTicketFormAction,
}: Props) {
  const [formStatus, setFormStatus] = useState<BoardFormStatus>({
    show: false,
    action: 'CREATE',
  });
  return (
    <>
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
      {formStatus.show && (
        <TicketForm
          action={formStatus.action}
          boardId={boardId}
          handleClose={() => setFormStatus({ show: false, action: 'CREATE' })}
          handleTicketFormAction={handleTicketFormAction}
        />
      )}
    </>
  );
}
