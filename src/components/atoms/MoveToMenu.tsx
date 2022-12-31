import { useState } from 'react';
import { BoardOption, Ticket } from 'models/client';
import { Button, Menu, MenuItem } from '@mui/material';

interface Props {
  ticket: Ticket;
  boardOptions: BoardOption[];
  handleMoveTicket: (
    ticket: Ticket,
    sourceBoardId: string,
    destinationBoardId: string
  ) => Promise<void>;
}

export default function BasicMenu({
  ticket,
  boardOptions,
  handleMoveTicket,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMoveTicketClick = (destinationBoardId: string) => {
    handleMoveTicket(ticket, ticket.board_id, destinationBoardId);
    handleClose();
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
        {boardOptions
          .filter((board) => board.board_id !== ticket.board_id)
          .map((boardOption) => (
            <MenuItem
              key={boardOption.board_id}
              onClick={() => handleMoveTicketClick(boardOption.board_id)}
            >
              {boardOption.boardName}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}
