import { Card, CardContent, CardMedia, Typography } from '@mui/material';

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
      <CardMedia component="img" height="75" image={image} alt={title} />
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
