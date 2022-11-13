import { WorkspaceSummary as WorkspaceSummaryType } from 'models/global';
import { useState } from 'react';
import { Box, Typography, Popover } from '@mui/material';
import Image from 'next/image';

interface Props {
  user: WorkspaceSummaryType['owner'];
  owner: boolean;
}

export default function UserPopover({ user, owner }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Box
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          overflow: 'hidden',
          border: 1,
          borderColor: `${owner ? 'secondary.main' : 'primary.main'}`,
        }}
      >
        <Image
          src={user.image}
          alt={user.name}
          width={20}
          height={20}
          layout="responsive"
        />
      </Box>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>
          {user.name}
          {owner ? ' (owner)' : ''}
        </Typography>
      </Popover>
    </div>
  );
}
