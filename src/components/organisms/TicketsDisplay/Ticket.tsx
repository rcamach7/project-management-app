import { useState } from 'react';
import {
  Ticket as TicketType,
  BoardFormStatus,
  LabelsEnum,
} from 'models/client';
import { Card, CardActions as TicketActions, Button } from '@mui/material';
import { ConfirmDeleteDialog } from '@/components/atoms/index';
import { TicketForm } from '@/components/molecules/index';
import TicketContent from './TicketContent';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  ticket: TicketType;
  handleTicketDelete: (ticketId: string) => void;
  handleTicketFormAction: (
    action: BoardFormStatus['action'],
    title: string,
    description: string,
    labels?: LabelsEnum[],
    boardId?: string,
    ticketId?: string
  ) => void;
}

export default function Ticket({
  ticket,
  handleTicketDelete,
  handleTicketFormAction,
}: Props) {
  const { _id, board_id, description, labels, title } = ticket;
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [formStatus, setFormStatus] = useState<BoardFormStatus>({
    show: false,
    action: 'CREATE',
  });

  return (
    <>
      <Card sx={{ border: 1 }}>
        <TicketContent
          description={description}
          title={title}
          labels={labels}
        />
        <TicketActions sx={{ py: 0.5 }}>
          <Button
            size="small"
            sx={{ color: 'secondary.main' }}
            onClick={() => setFormStatus({ show: true, action: 'EDIT' })}
          >
            Edit
          </Button>
          <Button size="small" sx={{ color: 'secondary.main' }}>
            Move to...
          </Button>
          <Button
            size="small"
            sx={{ color: 'red', fontSize: 13 }}
            onClick={() => setShowDeleteConfirmation((DC) => !DC)}
            startIcon={<DeleteIcon />}
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
      {formStatus.show && (
        <TicketForm
          action={formStatus.action}
          ticket={ticket}
          boardId={board_id}
          handleClose={() => setFormStatus({ show: false, action: 'CREATE' })}
          handleTicketFormAction={handleTicketFormAction}
        />
      )}
    </>
  );
}
