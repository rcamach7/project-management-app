import { FC } from 'react';
import { Box as MuiBox, BoxProps } from '@mui/material';

interface Props extends BoxProps {
  flex?: number;
  p?: number;
  padding?: string;
}

const CenteredBox: FC<Props> = ({ children, flex, p, padding }) => {
  const styles = {
    ...(flex && { flex }),
    ...(p && { p }),
    ...(padding && { padding }),
  };

  return (
    <MuiBox
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...styles,
      }}
    >
      {children}
    </MuiBox>
  );
};

export default CenteredBox;
