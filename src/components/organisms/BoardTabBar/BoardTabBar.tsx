import { Board, FormStatus } from 'models/client';
import { Box, Tabs, Typography } from '@mui/material';
import StyledTab from './StyledTab';
import TabButtons from './TabButtons';
import { CenteredBox } from '../../layout';

interface Props {
  boards: Board[];
  activeBoard: string;
  handleBoardChange: (boardId: string) => void;
  handleDeleteBoard: (boardId: string) => void;
  handleBoardFormAction: (
    action: FormStatus['action'],
    title: string,
    description: string,
    boardId?: string
  ) => void;
}

export default function BoardTabBar({
  boards,
  activeBoard,
  handleBoardChange,
  handleDeleteBoard,
  handleBoardFormAction,
}: Props) {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    handleBoardChange(newValue);
  };

  return (
    <Box>
      <TabButtons
        handleBoardFormAction={handleBoardFormAction}
        handleDeleteBoard={handleDeleteBoard}
        activeBoard={activeBoard}
        activeBoardData={boards.find((board) => board._id === activeBoard)}
      />
      {boards.length ? (
        <CenteredBox sx={{ flexDirection: 'row', mt: 1 }}>
          <Typography
            sx={{
              display: { xs: 'none', sm: 'block' },
              pl: 2,
              fontWeight: 'bold',
              fontSize: '1.2em',
              fontFamily: 'monospace',
            }}
          >
            Board{`${boards.length > 1 ? 's' : ''}`}:
          </Typography>
          <Tabs
            value={activeBoard}
            onChange={handleChange}
            variant="scrollable"
            aria-label="scrollable boards tabs"
            scrollButtons={true}
            allowScrollButtonsMobile
            sx={{ width: '100%' }}
            TabScrollButtonProps={{
              style: {
                width: 30,
                height: 48,
              },
            }}
            TabIndicatorProps={{
              style: {
                height: 0,
              },
            }}
          >
            {boards.map((board) => (
              <StyledTab
                key={board._id}
                label={board.title}
                value={board._id}
              />
            ))}
          </Tabs>
        </CenteredBox>
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
