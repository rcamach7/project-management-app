import { Box, Modal } from '@mui/material/';
import Form from './Form';
import { FormStatus } from 'models/client';

interface Props {
  action: 'CREATE' | 'EDIT';
  title?: string;
  description?: string;
  boardId?: string;
  handleClose: () => void;
  handleBoardFormAction: (
    action: FormStatus['action'],
    title: string,
    description: string,
    boardId?: string
  ) => void;
}

export default function BoardForm({
  title,
  description,
  boardId,
  action,
  handleClose,
  handleBoardFormAction,
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
          boardId={action === 'EDIT' ? boardId : undefined}
          handleBoardFormAction={handleBoardFormAction}
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
