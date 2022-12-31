import { useState } from 'react';
import {
  Ticket as TicketType,
  FormStatus,
  LabelsEnum,
  BoardOption,
} from 'models/client';
import { FloatingButton } from '@/components/atoms/index';
import { Box, useMediaQuery } from '@mui/material';
import { TicketForm } from '@/components/molecules/index';
import AddIcon from '@mui/icons-material/Add';
import { default as TicketComponent } from './Ticket';

interface Props {
  boardId: string;
  tickets: TicketType[];
  boardOptions: BoardOption[];
  handleTicketDelete: (ticketId: string) => void;
  handleTicketFormAction: (
    action: FormStatus['action'],
    title: string,
    description: string,
    labels?: LabelsEnum[],
    boardId?: string,
    ticketId?: string
  ) => void;
  handleMoveTicket: (
    ticket: TicketType,
    sourceBoardId: string,
    destinationBoardId: string
  ) => Promise<void>;
}

export default function TicketsDisplay({
  boardId,
  tickets,
  boardOptions,
  handleTicketDelete,
  handleTicketFormAction,
  handleMoveTicket,
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
        {[...tickets]
          .sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          })
          .map((ticket) => (
            <TicketComponent
              key={ticket._id}
              ticket={ticket}
              boardOptions={boardOptions}
              handleTicketDelete={handleTicketDelete}
              handleTicketFormAction={handleTicketFormAction}
              handleMoveTicket={handleMoveTicket}
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
