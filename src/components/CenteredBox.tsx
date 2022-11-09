import { FC } from 'react';
import { Box as MuiBox, BoxProps } from '@mui/material';

interface Props extends BoxProps {
  flex?: number;
}

const CenteredBox: FC<Props> = ({ children, flex }) => {
  return (
    <MuiBox
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex,
      }}
    >
      {children}
    </MuiBox>
  );
};

export default CenteredBox;
