import { Box, Modal } from '@mui/material/';
import { BoardFormStatus, LabelsEnum } from 'models/client';
import Form from './Form';

interface Props {
  action: 'CREATE' | 'EDIT';
  title?: string;
  description?: string;
  labels?: LabelsEnum[];
  boardId?: string;
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
  title,
  description,
  boardId,
  labels,
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
          handleClose={handleClose}
          title={action === 'EDIT' ? title : undefined}
          description={action === 'EDIT' ? description : undefined}
          labels={action === 'EDIT' ? labels : undefined}
          boardId={action === 'EDIT' ? boardId : undefined}
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
