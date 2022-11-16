import { Ticket as TicketType } from 'models/client';
import { Card, CardActions as TicketActions, Button } from '@mui/material';
import TicketContent from './TicketContent';

interface Props {
  ticket: TicketType;
}

export default function Ticket({ ticket }: Props) {
  const { _id, board_id, description, labels, title } = ticket;
  return (
    <Card sx={{ border: 1 }}>
      <TicketContent description={description} title={title} labels={labels} />
      <TicketActions>
        <Button size="small" sx={{ color: 'secondary.main' }}>
          Edit
        </Button>
        <Button size="small" sx={{ color: 'secondary.main' }}>
          Move to...
        </Button>
        <Button size="small" sx={{ color: 'red' }}>
          Delete
        </Button>
      </TicketActions>
    </Card>
  );
}
