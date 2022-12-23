import { useState } from 'react';
import {
  Ticket as TicketType,
  FormStatus,
  LabelsEnum,
  BoardOption,
} from 'models/client';
import {
  Card,
  CardActions as TicketActions,
  Button,
  Typography,
} from '@mui/material';
import { ConfirmDeleteDialog } from '@/components/atoms/index';
import { TicketForm } from '@/components/molecules/index';
import TicketContent from './TicketContent';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDistance } from 'date-fns';

interface Props {
  ticket: TicketType;
  boardOptions: BoardOption[];
  handleTicketDelete: (ticketId: string) => void;
  handleTicketFormAction: (
    action: FormStatus['action'],
    title: string,
    description: string,
    labels?: LabelsEnum[],
    boardId?: string,
    ticketId?: string
  ) => void;
}

export default function Ticket({
  ticket,
  boardOptions,
  handleTicketDelete,
  handleTicketFormAction,
}: Props) {
  const { _id, board_id, title } = ticket;
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    show: false,
    action: 'CREATE',
  });

  return (
    <>
      <Card sx={{ border: 1 }}>
        <TicketContent ticket={ticket} />
        <TicketActions sx={{ py: 0.5, display: 'flex', flexWrap: 'wrap' }}>
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

          <Typography
            variant="body2"
            sx={{
              fontSize: 10,
              color: 'text.secondary',
              pr: 1.5,
              textAlign: 'right',
              ml: 'auto',
            }}
          >
            created{' '}
            {formatDistance(new Date(ticket.createdAt), new Date(), {
              addSuffix: true,
            })}
          </Typography>
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
