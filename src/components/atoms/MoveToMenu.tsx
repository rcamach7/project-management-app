import { useState } from 'react';
import { BoardOption } from 'models/client';
import { Button, Menu, MenuItem } from '@mui/material';

interface Props {
  boardOptions: BoardOption[];
}

export default function BasicMenu({ boardOptions }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="small"
        sx={{ color: 'secondary.main' }}
      >
        Move to...
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {boardOptions.map((boardOption) => (
          <MenuItem key={boardOption.board_id} onClick={handleClose}>
            {boardOption.boardName}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
