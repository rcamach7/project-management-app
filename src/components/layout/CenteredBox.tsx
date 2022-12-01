import { FC } from 'react';
import { Box as MuiBox, BoxProps } from '@mui/material';

interface Props extends BoxProps {
  flex?: number;
  sx?: {};
}

export default function CenteredBox({ children, flex, sx }: Props) {
  return (
    <MuiBox
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...(flex && { flex }),
        ...sx,
      }}
    >
      {children}
    </MuiBox>
  );
}
