import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface Props {
  title: string;
  description: string;
  image: string;
  handleTemplateCreation: (template: string) => Promise<void>;
}

export default function TemplateCard({
  title,
  image,
  handleTemplateCreation,
}: Props) {
  return (
    <Card sx={{ maxWidth: 300, minWidth: 225 }} elevation={0}>
      <CardActionArea
        sx={{ pt: 1 }}
        onClick={() => handleTemplateCreation(title)}
      >
        <CardMedia
          component="img"
          height="100"
          image={image}
          alt={title}
          style={{ width: '100%', objectFit: 'contain' }}
        />
        <CardContent sx={{ pt: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: 'center' }}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
