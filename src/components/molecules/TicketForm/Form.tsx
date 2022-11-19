import { useState } from 'react';
import { BoardFormStatus, LabelsEnum, Ticket } from 'models/client';
import {
  Box,
  Button,
  InputBase,
  Typography,
  SelectChangeEvent,
  InputLabel,
} from '@mui/material';
import MultipleSelect from './MultipleSelect';

interface Props {
  action: 'CREATE' | 'EDIT';
  boardId: string;
  ticket?: Ticket;
  handleClose: () => void;
  handleTicketFormAction: (
    action: BoardFormStatus['action'],
    title: string,
    description: string,
    labels?: LabelsEnum[],
    boardId?: string,
    ticketId?: string
  ) => void;
}

export default function Form({
  action,
  ticket,
  boardId,
  handleClose,
  handleTicketFormAction,
}: Props) {
  const [formDetails, setFormDetails] = useState({
    title: ticket ? ticket.title : '',
    description: ticket ? ticket.description : '',
    selectedLabels: ticket ? ticket.labels : [],
  });

  const handleLabelsSelectionChange = (
    event: SelectChangeEvent<typeof formDetails.selectedLabels>
  ) => {
    const {
      target: { value },
    } = event;
    if (typeof value !== 'string') {
      setFormDetails({ ...formDetails, selectedLabels: value });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClose();
    handleTicketFormAction(
      action,
      formDetails.title,
      formDetails.description,
      formDetails.selectedLabels,
      action === 'CREATE' ? boardId : null,
      action === 'EDIT' ? ticket._id : null
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ pb: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }} textAlign="center">
        {action === 'CREATE' ? 'Create ' : 'Edit '}Ticket
      </Typography>

      <InputLabel shrink htmlFor="ticket-title-input">
        Ticket Title
      </InputLabel>
      <InputBase
        id="ticket-title-input"
        placeholder="enter ticket title"
        name="title"
        onChange={handleInputChange}
        value={formDetails.title}
        sx={{ border: 1, px: 1, borderRadius: 1, mb: 2 }}
        inputProps={{ minLength: 3, maxLength: 100 }}
        fullWidth
        required
      />

      <InputLabel shrink htmlFor="ticket-description-input">
        Ticket Description
      </InputLabel>
      <InputBase
        id="ticket-description-input"
        name="description"
        placeholder="enter brief description"
        onChange={handleInputChange}
        value={formDetails.description}
        sx={{ border: 1, px: 1, borderRadius: 1, mb: 2 }}
        inputProps={{ minLength: 3, maxLength: 255 }}
        fullWidth
        required
        multiline
      />

      <MultipleSelect
        selectedLabels={formDetails.selectedLabels}
        handleChange={handleLabelsSelectionChange}
      />

      <Button
        variant="outlined"
        sx={{
          color: 'secondary.main',
          border: 1,
          borderColor: 'secondary.main',
          p: '2px 4px',
          mr: 2,
        }}
        type="submit"
      >
        Submit
      </Button>
      <Button
        variant="text"
        sx={{
          color: 'red',
          p: '2px 4px',
        }}
        onClick={handleClose}
      >
        Cancel
      </Button>
    </Box>
  );
}
