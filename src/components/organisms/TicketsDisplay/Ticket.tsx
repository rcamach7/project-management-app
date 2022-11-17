import { useState } from 'react';
import { Ticket as TicketType } from 'models/client';
import { Card, CardActions as TicketActions, Button } from '@mui/material';
import { ConfirmDeleteDialog } from '@/components/atoms/index';
import TicketContent from './TicketContent';

interface Props {
  ticket: TicketType;
  handleTicketDelete: (ticketId: string) => void;
}

export default function Ticket({ ticket, handleTicketDelete }: Props) {
  const { _id, board_id, description, labels, title } = ticket;
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <Card sx={{ border: 1 }}>
        <TicketContent
          description={description}
          title={title}
          labels={labels}
        />
        <TicketActions>
          <Button size="small" sx={{ color: 'secondary.main' }}>
            Edit
          </Button>
          <Button size="small" sx={{ color: 'secondary.main' }}>
            Move to...
          </Button>
          <Button
            size="small"
            sx={{ color: 'red' }}
            onClick={() => setShowDeleteConfirmation((DC) => !DC)}
          >
            Delete
          </Button>
        </TicketActions>
      </Card>
      {showDeleteConfirmation && (
        <ConfirmDeleteDialog
          title={`Are you sure you want to delete this ticket? (${title})`}
          content={`This will delete the ticket from the board and all of its data will be lost.`}
          open={showDeleteConfirmation}
          asset_id={_id}
          handleClose={() => setShowDeleteConfirmation(false)}
          handleDelete={handleTicketDelete}
        />
      )}
    </>
  );
}
