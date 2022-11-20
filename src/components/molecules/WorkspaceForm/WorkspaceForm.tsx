import { Box, Modal } from '@mui/material/';
import { FormStatus, Workspace } from 'models/client';
import Form from './Form';

interface Props {
  action: 'CREATE' | 'EDIT';
  workspace?: Workspace;
  handleClose: () => void;
  handleWorkspaceFormAction: (
    action: FormStatus['action'],
    title: string,
    description: string,
    workspaceId?: string
  ) => void;
}

export default function TicketForm({
  workspace,
  action,
  handleWorkspaceFormAction,
  handleClose,
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
          workspace={workspace ? workspace : undefined}
          handleClose={handleClose}
          handleWorkspaceFormAction={handleWorkspaceFormAction}
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
