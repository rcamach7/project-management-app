import { FC } from 'react';
import { Box as MuiBox, BoxProps } from '@mui/material';

interface Props extends BoxProps {
  flex?: number;
  sx?: {};
}

const CenteredBox: FC<Props> = ({ children, flex, sx }) => {
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
};

export default CenteredBox;
