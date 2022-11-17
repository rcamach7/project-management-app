import Head from 'next/head';
import { useEffect, useState } from 'react';
import { unstable_getServerSession } from 'next-auth/next';
import { AppSession } from 'models/global';
import { authOptions } from '@/auth/[...nextauth]';
import { getWorkspaceById } from 'controllers/workspaceController';
import { ResponsiveAppBar, BoardTabBar } from '@/components/organisms/index';
import { PageTitle } from '@/components/atoms/index';
import { TicketsDisplay } from '@/components/organisms/index';
import { Workspace, UxFeedbackState } from 'models/client';
import { Box } from '@mui/material';
import { deleteTicketByID } from '@/lib/clientApi';
import { deleteTicketFromWorkspace } from '@/lib/helpers';
import { UxFeedback } from '@/components/molecules/index';

export default function Workspace_Continued({ mySession, workspace }) {
  const { user }: AppSession = JSON.parse(mySession);
  const [workspaceState, setWorkspaceState] = useState<Workspace>(
    JSON.parse(workspace)
  );
  const [uxFeedback, setUxFeedback] = useState<UxFeedbackState>({
    loading: false,
    showBanner: false,
    bannerMessage: '',
  });

  // Reset banner messages state after 3 seconds and remove from UI
  useEffect(() => {
    if (uxFeedback.showBanner) {
      setTimeout(() => {
        setUxFeedback({ ...uxFeedback, showBanner: false, bannerMessage: '' });
      }, 3000);
    }
  }, [uxFeedback.showBanner]);

  const [activeBoard, setActiveBoard] = useState(
    workspaceState.boards.length ? workspaceState.boards[0]._id : ''
  );
  const board = workspaceState.boards.find(
    (board) => board._id === activeBoard
  );

  const handleBoardChange = (boardId: string) => {
    setActiveBoard(boardId);
  };

  const handleTicketDelete = async (ticketId: string) => {
    try {
      setUxFeedback({ ...uxFeedback, loading: true });
      await deleteTicketByID(ticketId);
      setWorkspaceState((prevState) => {
        return deleteTicketFromWorkspace(prevState, ticketId);
      });
      setUxFeedback({
        loading: false,
        showBanner: true,
        bannerMessage: 'Successfully Deleted Ticket',
        bannerType: 'success',
      });
    } catch (error) {
      setUxFeedback({
        loading: false,
        showBanner: true,
        bannerType: 'error',
        bannerMessage: 'Error occurred deleting ticket',
      });
      console.error(error);
    }
  };

  return (
    <>
      <Head>Flow: Workspace Page</Head>
      <Box
        sx={{
          minWidth: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ResponsiveAppBar name={user.name} image={user.image} />
        <Box
          sx={{
            flex: 1,
            width: '100%',
            maxWidth: '1000px',
            overflow: 'scroll',
            display: 'flex',
            flexDirection: 'column',
            mx: 'auto',
          }}
        >
          <PageTitle subheading={workspaceState.name} sx={{ pt: 2, pb: 1 }} />
          <BoardTabBar
            boards={workspaceState.boards}
            activeBoard={activeBoard}
            handleBoardChange={handleBoardChange}
          />
          {board && (
            <TicketsDisplay
              tickets={board.tickets}
              handleTicketDelete={handleTicketDelete}
            />
          )}
        </Box>
      </Box>
      <UxFeedback
        loading={uxFeedback.loading}
        showBanner={uxFeedback.showBanner}
        bannerMessage={uxFeedback.bannerMessage}
        bannerType={uxFeedback.bannerType ? uxFeedback.bannerType : 'success'}
      />
    </>
  );
}

export async function getServerSideProps({ req, res, query }) {
  const session: AppSession = await unstable_getServerSession(
    req,
    res,
    authOptions
  );
  const { id } = query;

  if (session) {
    const mySession = JSON.stringify(session);
    const workspace = await getWorkspaceById(id);
    return {
      props: {
        mySession,
        workspace: JSON.stringify(workspace),
      },
    };
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}
