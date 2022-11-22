import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface Props {
  title?: string;
  subheading?: string;
  additionalText?: string;
  image?: string;
  bold?: boolean;
  sx?: {};
}

export default function PageTitle({
  title,
  subheading,
  additionalText,
  image,
  bold,
  sx,
}: Props) {
  return (
    <Box textAlign="center" sx={{ ...sx }}>
      {image && <Image src={image} alt={title} width={500} height={125} />}
      {title && (
        <Typography
          variant="h1"
          sx={{ fontSize: '3rem', fontWeight: bold ? 'bold' : '' }}
        >
          {title}
        </Typography>
      )}
      {subheading && (
        <Typography
          variant="h2"
          sx={{ fontSize: '1.25rem', fontWeight: bold ? 'bold' : '' }}
        >
          {subheading}
          <Typography
            variant="h2"
            sx={{ fontSize: '1.25rem', display: { xs: 'none', md: 'block' } }}
          >
            {additionalText}
          </Typography>
        </Typography>
      )}
    </Box>
  );
}
