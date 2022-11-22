import { Card, CardContent, Box, Typography } from '@mui/material';
import { Feature } from 'models/client';
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
        minHeight: { xs: 190, md: 225 },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          height: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image src={image} alt={title} width={75} height={75} layout="fixed" />
      </Box>
      <CardContent
        sx={{
          p: 0,
          textAlign: 'center',
          paddingBottom: '5px !important',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
