import { useState } from 'react';
import { Board } from 'models/client';
import { Box, Tabs, Typography } from '@mui/material';
import StyledTab from './StyledTab';
import TabButtons from './TabButtons';

interface Props {
  boards: Board[];
}

export default function BoardTabBar({ boards }: Props) {
  const [value, setValue] = useState(boards.length ? boards[0]._id : null);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ borderBottom: { xs: 1, m: 2 }, borderColor: 'text.secondary' }}>
      <TabButtons />
      {boards.length ? (
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          aria-label="scrollable boards tabs"
          scrollButtons={true}
          allowScrollButtonsMobile
          sx={{ width: '100%' }}
        >
          {boards.map((board) => (
            <StyledTab key={board._id} label={board.title} value={board._id} />
          ))}
        </Tabs>
      ) : (
        <Typography
          sx={{
            textAlign: 'center',
            p: 1,
            fontSize: { xs: '1em', sm: '1.3em' },
          }}
        >
          Create a new board to get started...
        </Typography>
      )}
    </Box>
  );
}
