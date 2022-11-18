import { LabelsEnum } from 'models/client';
import { Box, CardContent, Typography } from '@mui/material';
import LabelsDisplay from './LabelsDisplay';

interface Props {
  labels: LabelsEnum[];
  title: string;
  description: string;
}

export default function TicketContent({ labels, title, description }: Props) {
  return (
    <CardContent sx={{ py: 1, px: 1.5 }}>
      <LabelsDisplay labels={labels} mobile={true} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <LabelsDisplay labels={labels} mobile={false} />
      </Box>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  );
}
