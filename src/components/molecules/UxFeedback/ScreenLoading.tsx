import { Box, CircularProgress, Modal } from '@mui/material/';

export default function ScreenLoading() {
  return (
    <Modal open={true}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress sx={{ maxHeight: '100%', color: 'white' }} />
      </Box>
    </Modal>
  );
}
