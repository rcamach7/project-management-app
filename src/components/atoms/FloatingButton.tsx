import * as React from 'react';
import { Fab } from '@mui/material';

interface Props {
  text: string;
  icon: React.ReactNode;
  anchorBottom: boolean;
  onClick: () => void;
}

export default function FloatingActionButton({
  text,
  icon,
  anchorBottom,
  onClick,
}: Props) {
  const style = {
    fontSize: { xs: 12, sm: 16, md: 14 },
    backgroundColor: 'background.paper',
    color: 'text.primary',
    border: 1,
    '&:hover': {
      backgroundColor: '#828DAF',
      color: 'black',
    },
    ...(anchorBottom && { position: 'absolute', bottom: 16, right: 16 }),
  };

  return (
    <Fab
      sx={style}
      variant="extended"
      size="small"
      aria-label="add ticket"
      onClick={onClick}
    >
      {icon}
      {text}
    </Fab>
  );
}
