import { WorkspaceSummary as WorkspaceSummaryType } from 'models/global';
import { Box, Typography } from '@mui/material';
import UserPopper from './UserPopper';

interface Props {
  users: WorkspaceSummaryType['users'];
  owner: WorkspaceSummaryType['owner'];
}

export default function UsersSummary({ users, owner }: Props) {
  return (
    <Box
      sx={{ display: 'flex', p: 0.5, gap: 1, alignItems: 'center', mt: 'auto' }}
    >
      <Typography variant="caption">Users:</Typography>
      {users.map((currentUser) => (
        <UserPopper
          key={currentUser._id}
          user={currentUser}
          owner={currentUser._id === owner._id}
        />
      ))}
    </Box>
  );
}
