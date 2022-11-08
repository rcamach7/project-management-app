import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography>Welcome to my Flow Project!</Typography>
    </Box>
  );
}
