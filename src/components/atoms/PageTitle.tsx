import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface Props {
  title?: string;
  subheading?: string;
  image?: string;
}

export default function PageTitle({ title, subheading, image }: Props) {
  return (
    <Box textAlign="center">
      {image && <Image src={image} alt={title} width={500} height={125} />}
      {title && (
        <Typography variant="h1" sx={{ fontSize: '3rem' }}>
          {title}
        </Typography>
      )}
      {subheading && (
        <Typography variant="h2" sx={{ fontSize: '1.25rem' }}>
          {subheading}
        </Typography>
      )}
    </Box>
  );
}
