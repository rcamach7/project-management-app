import { Box, Typography } from '@mui/material';
import { CenteredBox } from '@/components/index';

interface Props {
  text: string;
}

export default function ImageButton({ text }: Props) {
  return (
    <CenteredBox sx={{ height: '100px', gap: 0.5 }}>
      <Box
        sx={{
          width: '5em',
          height: '5em',
          background: 'red',
          borderRadius: '50%',
        }}
      />
      <Typography>{text}</Typography>
    </CenteredBox>
  );
}
