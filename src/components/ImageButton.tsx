import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { CenteredBox } from '@/components/index';

interface Props {
  text: string;
  image: string;
  onClick: () => void;
}

export default function ImageButton({ text, image, onClick }: Props) {
  return (
    <CenteredBox sx={{ height: '100px', gap: 0.5 }}>
      <Box
        sx={{
          cursor: 'pointer',
          width: { xs: '4em', sm: '4.5em' },
          height: { xs: '4em', sm: '4.5em' },
          // TODO: Pull from theme
          background: '#112240',
          borderRadius: '50%',
          transition: 'all .2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
            backgroundColor: 'text.secondary',
          },
          border: 1,
          padding: 2,
        }}
        onClick={onClick}
      >
        <Image src={image} width="20" height="20" layout="responsive" />
      </Box>
      <Typography>{text}</Typography>
    </CenteredBox>
  );
}
