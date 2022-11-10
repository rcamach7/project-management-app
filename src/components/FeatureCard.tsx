import { Card, CardContent, Box, Typography } from '@mui/material';
import { Feature } from 'models/client.models';
import Image from 'next/image';

export default function FeatureCard({ image, title, description }: Feature) {
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
