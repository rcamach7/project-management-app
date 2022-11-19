import { useState } from 'react';
import { BoardFormStatus, LabelsEnum, Ticket } from 'models/client';
import {
  Box,
  Button,
  InputBase,
  Typography,
  SelectChangeEvent,
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
    if (action === 'CREATE') {
      // handleTicketFormAction(
      //   'CREATE',
      //   formDetails.title,
      //   formDetails.description
      // );
    } else {
      handleTicketFormAction(
        action,
        formDetails.title,
        formDetails.description,
        formDetails.selectedLabels,
        null,
        ticket._id
      );
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ pb: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }} textAlign="center">
        {action === 'CREATE' ? 'Create ' : 'Edit '}Ticket
      </Typography>
      <Box pb={1}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Ticket Title:
        </Typography>
        <InputBase
          onChange={handleInputChange}
          value={formDetails.title}
          name="title"
          sx={{ border: 1, px: 1 }}
          placeholder="enter board title"
          fullWidth
        />
      </Box>
      <Box pb={2}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Ticket Description:
        </Typography>
        <InputBase
          onChange={handleInputChange}
          value={formDetails.description}
          name="description"
          sx={{ border: 1, px: 1 }}
          placeholder="enter brief description"
          fullWidth
        />
      </Box>
      <Box>
        <MultipleSelect
          labels={ticket ? ticket.labels : []}
          selectedLabels={formDetails.selectedLabels}
          handleChange={handleLabelsSelectionChange}
        />
      </Box>

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
