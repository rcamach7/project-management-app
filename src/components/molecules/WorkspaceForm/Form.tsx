import { useState } from 'react';
import { FormStatus } from 'models/client';
import { Box, Button, InputBase, Typography, InputLabel } from '@mui/material';
import { WorkspaceSummary } from 'models/global';

interface Props {
  action: 'CREATE' | 'EDIT';
  workspace?: WorkspaceSummary;
  handleClose: () => void;
  handleWorkspaceFormAction: (
    action: FormStatus['action'],
    title: string,
    description: string,
    workspaceId?: string
  ) => void;
}

export default function Form({
  action,
  workspace,
  handleClose,
  handleWorkspaceFormAction,
}: Props) {
  const [formDetails, setFormDetails] = useState({
    title: workspace ? workspace.name : '',
    description: workspace ? workspace.description : '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClose();
    handleWorkspaceFormAction(
      action,
      formDetails.title,
      formDetails.description,
      workspace ? workspace._id : undefined
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ pb: 2 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold', pb: 1 }}
        textAlign="center"
      >
        {action === 'CREATE' ? 'Create ' : 'Edit '}Workspace
      </Typography>

      <InputLabel shrink htmlFor="workspace-title-input">
        Workspace Title
      </InputLabel>
      <InputBase
        id="workspace-title-input"
        placeholder="enter workspace title"
        name="title"
        onChange={handleInputChange}
        value={formDetails.title}
        sx={{ border: 1, px: 1, borderRadius: 1, mb: 2 }}
        inputProps={{ minLength: 3, maxLength: 100 }}
        fullWidth
        required
      />

      <InputLabel shrink htmlFor="workspace-description-input">
        Workspace Description
      </InputLabel>
      <InputBase
        id="workspace-description-input"
        name="description"
        placeholder="enter brief description"
        onChange={handleInputChange}
        value={formDetails.description}
        sx={{ border: 1, px: 1, borderRadius: 1, mb: 4 }}
        inputProps={{ minLength: 3, maxLength: 255 }}
        fullWidth
        required
        multiline
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
