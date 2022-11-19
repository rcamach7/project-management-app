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
  return (
    <Fab
      sx={
        anchorBottom ? bottomStyles : { fontSize: { xs: 10, sm: 12, md: 14 } }
      }
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

const bottomStyles = {
  fontSize: { xs: 12, sm: 16 },
  position: 'absolute',
  bottom: 16,
  right: 16,
};
