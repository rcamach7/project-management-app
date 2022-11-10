import { Card, CardContent, CardMedia, Box, Typography } from '@mui/material';
import Image from 'next/image';

interface Props {
  image: string;
  title: string;
  description: string;
}

export default function FeatureCard({ image, title, description }: Props) {
  return (
    <Card
      sx={{
        pb: 0,
        transition: 'all .2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.1)',
        },
        background: 'background.paper',
      }}
    >
      <Box sx={{ height: 'clamp(100px, 25vw, 150px)', overflow: 'hidden' }}>
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          layout="responsive"
          objectFit="cover"
        />
      </Box>
      <CardContent sx={{ padding: '.50em !important', textAlign: 'center' }}>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
