import { Ticket as TicketType } from 'models/client';
import { Box, CardContent, Typography } from '@mui/material';
import LabelsDisplay from './LabelsDisplay';

interface Props {
  ticket: TicketType;
}

export default function TicketContent({ ticket }: Props) {
  const { title, description, labels, _id } = ticket;
  const lastFourOfId = _id.slice(-4);

  return (
    <CardContent sx={{ py: 1, px: 1.5 }}>
      <LabelsDisplay labels={labels} mobile={true} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
          <Typography
            variant="body2"
            component="span"
            sx={{
              fontSize: 16,
              color: 'text.secondary',
              pl: 1,
            }}
          >
            #{lastFourOfId}
          </Typography>
        </Typography>
        <LabelsDisplay labels={labels} mobile={false} />
      </Box>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  );
}
