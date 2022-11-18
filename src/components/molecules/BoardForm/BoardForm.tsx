import { Box, Modal } from '@mui/material/';
import Form from './Form';

interface Props {
  action: 'CREATE' | 'UPDATE';
  handleClose: () => void;
}

export default function BoardForm({ action, handleClose }: Props) {
  return (
    <Modal open={true} onClose={handleClose}>
      <Box
        sx={{
          ...style,
        }}
      >
        <Form action={action} />
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
