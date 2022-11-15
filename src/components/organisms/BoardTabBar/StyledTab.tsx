import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-selected': {
    color: '#F3C610',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

export default StyledTab;
