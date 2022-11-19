import { useState } from 'react';
import { FormStatus } from 'models/client';
import { Box, Button, InputBase, Typography, InputLabel } from '@mui/material';

interface Props {
  action: 'CREATE' | 'EDIT';
  title?: string;
  description?: string;
  boardId?: string;
  handleClose: () => void;
  handleBoardFormAction: (
    action: FormStatus['action'],
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

      <InputLabel shrink htmlFor="board-title-input">
        Board Title
      </InputLabel>
      <InputBase
        id="board-title-input"
        placeholder="enter board title"
        name="title"
        onChange={handleInputChange}
        value={formDetails.title}
        sx={{ border: 1, px: 1, borderRadius: 1, mb: 2 }}
        inputProps={{ minLength: 3, maxLength: 100 }}
        fullWidth
        required
      />

      <InputLabel shrink htmlFor="board-description-input">
        Board Description
      </InputLabel>
      <InputBase
        id="board-description-input"
        placeholder="enter brief description"
        name="description"
        onChange={handleInputChange}
        value={formDetails.description}
        sx={{ border: 1, px: 1, borderRadius: 1, mb: 2 }}
        inputProps={{ minLength: 3, maxLength: 255 }}
        fullWidth
        required
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
