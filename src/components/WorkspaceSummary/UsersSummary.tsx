import { WorkspaceSummary as WorkspaceSummaryType } from 'models/global';
import { Box, Typography, Popover } from '@mui/material';
import UserPopper from './UserPopper';

interface Props {
  users: WorkspaceSummaryType['users'];
  owner: WorkspaceSummaryType['owner'];
}

export default function UsersSummary({ users }: Props) {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {users.map((user) => (
        <UserPopper key={user._id} user={user} />
      ))}
    </Box>
  );
}
