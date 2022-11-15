import { useState, SyntheticEvent } from 'react';
import { Box, Tabs } from '@mui/material';
import { CenteredBox } from '@/components/layout/index';
import StyledTab from './StyledTab';
import TabButtons from './TabButtons';

export default function BoardTabBar() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <TabButtons />
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        aria-label="scrollable boards tabs"
        scrollButtons={true}
        allowScrollButtonsMobile
        sx={{ width: '100%' }}
      >
        <StyledTab label="Item One" />
        <StyledTab label="Item Two" />
        <StyledTab label="Item Three" />
        <StyledTab label="Item Four" />
        <StyledTab label="Item Five" />
        <StyledTab label="Item Six" />
        <StyledTab label="Item Seven" />
      </Tabs>
    </Box>
  );
}
