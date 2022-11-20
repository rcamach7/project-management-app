import { WorkspaceSummary as WorkspaceSummaryType } from 'models/global';
import { Box, Typography } from '@mui/material';
import UserPopper from './UserPopper';

interface Props {
  users: WorkspaceSummaryType['users'];
  owner: WorkspaceSummaryType['owner'];
}

export default function UsersSummary({ users, owner }: Props) {
  return (
    <Box sx={{ display: 'flex', py: 1, gap: 1, alignItems: 'center' }}>
      {users.map((currentUser, i) => (
        <UserPopper
          key={currentUser._id + i}
          user={currentUser}
          owner={currentUser._id === owner._id}
        />
      ))}
    </Box>
  );
}
