import { useState } from 'react';
import { Ticket as TicketType, FormStatus, LabelsEnum } from 'models/client';
import { FloatingButton } from '@/components/atoms/index';
import { Box, useMediaQuery } from '@mui/material';
import { TicketForm } from '@/components/molecules/index';
import AddIcon from '@mui/icons-material/Add';
import { default as TicketComponent } from './Ticket';

interface Props {
  boardId: string;
  tickets: TicketType[];
  handleTicketDelete: (ticketId: string) => void;
  handleTicketFormAction: (
    action: FormStatus['action'],
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
  const [formStatus, setFormStatus] = useState<FormStatus>({
    show: false,
    action: 'CREATE',
  });
  const isWindowDesktop = useMediaQuery('(min-width:800px)');

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
        {isWindowDesktop && (
          <FloatingButton
            icon={<AddIcon />}
            text="Add Ticket"
            anchorBottom={false}
            onClick={() => setFormStatus({ show: true, action: 'CREATE' })}
          />
        )}
      </Box>
      {!isWindowDesktop && (
        <FloatingButton
          icon={<AddIcon />}
          text="Add Ticket"
          anchorBottom={true}
          onClick={() => setFormStatus({ show: true, action: 'CREATE' })}
        />
      )}
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
