import { Box, Modal } from '@mui/material/';
import Form from './Form';
import { BoardFormStatus } from 'models/client';

interface Props {
  action: 'CREATE' | 'EDIT';
  title?: string;
  description?: string;
  handleClose: () => void;
  handleBoardFormAction: (
    action: BoardFormStatus['action'],
    title: string,
    description: string
  ) => void;
}

export default function BoardForm({
  title,
  description,
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
