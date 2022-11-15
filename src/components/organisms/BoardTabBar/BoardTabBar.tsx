import { useState, SyntheticEvent } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import StyledTab from './StyledTab';

export default function BoardTabBar() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: '',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        aria-label="scrollable auto tabs example"
        scrollButtons="auto"
        allowScrollButtonsMobile
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
