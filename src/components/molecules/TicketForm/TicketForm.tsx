import { Box, Modal } from '@mui/material/';
import { BoardFormStatus, LabelsEnum, Ticket } from 'models/client';
import Form from './Form';

interface Props {
  action: 'CREATE' | 'EDIT';
  boardId: string;
  ticket?: Ticket;
  handleClose: () => void;
  handleTicketFormAction: (
    action: BoardFormStatus['action'],
    title: string,
    description: string,
    labels?: LabelsEnum[],
    boardId?: string,
    ticketId?: string
  ) => void;
}

export default function TicketForm({
  ticket,
  boardId,
  action,
  handleClose,
  handleTicketFormAction,
}: Props) {
  return (
    <Modal open={true} onClose={handleClose}>
      <Box
        sx={{
          ...style,
        }}
      >
        <Form
          action={action}
          ticket={ticket ? ticket : undefined}
          boardId={boardId}
          handleClose={handleClose}
          handleTicketFormAction={handleTicketFormAction}
        />
      </Box>
    </Modal>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'clamp(300px, 90vw, 400px)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  paddingBottom: '5px',
  paddingTop: '10px',
  borderRadius: '10px',
};
