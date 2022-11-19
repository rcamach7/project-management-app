import { useState, useEffect } from 'react';
import { BoardFormStatus } from 'models/client';
import { Box, Button, InputBase, Typography } from '@mui/material';

interface Props {
  action: 'CREATE' | 'EDIT';
  title?: string;
  description?: string;
  boardId?: string;
  handleClose: () => void;
  handleBoardFormAction: (
    action: BoardFormStatus['action'],
    title: string,
    description: string,
    boardId?: string
  ) => void;
}

export default function Form({
  action,
  title,
  description,
  boardId,
  handleClose,
  handleBoardFormAction,
}: Props) {
  const [formDetails, setFormDetails] = useState({
    title: title || '',
    description: description || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClose();
    handleBoardFormAction(
      action,
      formDetails.title,
      formDetails.description,
      action === 'EDIT' ? boardId : undefined
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ pb: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }} textAlign="center">
        {action === 'CREATE' ? 'Create ' : 'Edit '}Board
      </Typography>
      <Box pb={1}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Board Title:
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
          Board Description:
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
