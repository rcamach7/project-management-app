import { Box, Typography } from '@mui/material';

interface Props {
  title: string;
  subheading?: string;
}

export default function PageTitle({ title, subheading }: Props) {
  return (
    <Box textAlign="center">
      <Typography variant="h1" sx={{ fontSize: '3rem' }}>
        {title}
      </Typography>
      <Typography variant="h2" sx={{ fontSize: '1.5rem' }}>
        {subheading}
      </Typography>
    </Box>
  );
}
