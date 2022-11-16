import { Ticket as TicketType } from 'models/client';
import { Box } from '@mui/material';

interface Props {
  ticket: TicketType;
}

export default function Ticket({ ticket }: Props) {
  const { _id, board_id, description, labels, title } = ticket;
  return <Box>{_id}</Box>;
}
