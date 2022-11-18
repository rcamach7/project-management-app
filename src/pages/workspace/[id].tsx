import Head from 'next/head';
import clientApi from '@/lib/clientApi';
import helpers from '@/lib/helpers';
import { useEffect, useState } from 'react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/[...nextauth]';
import { getWorkspaceById } from 'controllers/workspaceController';
import { AppSession } from 'models/global';
import {
  Workspace,
  UxFeedbackState,
  BoardFormStatus,
  LabelsEnum,
} from 'models/client';
import {
  ResponsiveAppBar,
  BoardTabBar,
  TicketsDisplay,
} from '@/components/organisms/index';
import { PageTitle } from '@/components/atoms/index';
import { UxFeedback } from '@/components/molecules/index';
import { Box } from '@mui/material';

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

  const [activeBoard, setActiveBoard] = useState(
    workspaceState.boards.length ? workspaceState.boards[0]._id : ''
  );
  const board = workspaceState.boards.find(
    (board) => board._id === activeBoard
  );

  const handleBoardChange = (boardId: string) => {
    setActiveBoard(boardId);
  };
  const resetActiveBoard = () => {
    setActiveBoard(workspaceState.boards[0]._id);
  };

  const displayErrorMessage = (message: string, error: any) => {
    setUxFeedback({
      loading: false,
      showBanner: true,
      bannerType: 'error',
      bannerMessage: message,
    });
    console.error(error);
  };

  const displaySuccessMessage = (message: string) => {
    setUxFeedback({
      loading: false,
      showBanner: true,
      bannerType: 'success',
      bannerMessage: message,
    });
  };

  const displayLoading = () => setUxFeedback({ ...uxFeedback, loading: true });

  const handleTicketDelete = async (ticketId: string) => {
    try {
      displayLoading();
      await clientApi.deleteTicketByID(ticketId);
      setWorkspaceState((prevState) => {
        return helpers.deleteTicketFromWorkspace(prevState, ticketId);
      });
      displaySuccessMessage('Ticket deleted successfully');
    } catch (error) {
      displayErrorMessage(
        'Error deleting Ticket. Please try again later.',
        error
      );
    }
  };

  const handleDeleteBoard = async (boardId: string) => {
    try {
      displayLoading();
      await clientApi.deleteBoardByID(boardId);
      setWorkspaceState((prevState) => {
        return helpers.deleteBoardFromWorkspace(prevState, boardId);
      });
      resetActiveBoard();
      displaySuccessMessage('Board deleted successfully');
    } catch (error) {
      displayErrorMessage(
        'Error deleting board. Please try again later.',
        error
      );
    }
  };

  const handleBoardFormAction = async (
    action: BoardFormStatus['action'],
    title: string,
    description: string,
    boardId?: string
  ) => {
    try {
      displayLoading();
      if (action === 'CREATE') {
        const board = await clientApi.createBoard(
          title,
          description,
          workspaceState._id
        );
        setWorkspaceState((prevState) => {
          return helpers.addBoardToWorkspace(prevState, board);
        });
      }
      if (action === 'EDIT' && boardId) {
        const updatedBoard = await clientApi.updateBoard(
          title,
          description,
          boardId
        );
        setWorkspaceState((prevState) => {
          return helpers.updateBoardInWorkspace(prevState, updatedBoard);
        });
      }

      displaySuccessMessage(`Board ${action.toLowerCase()}ed successfully`);
    } catch (error) {
      displayErrorMessage(
        `Error occurred while ${action.toLowerCase()}ing board. Please try again later.`,
        error
      );
    }
  };

  const handleTicketFormAction = async (
    action: BoardFormStatus['action'],
    title: string,
    description: string,
    labels?: LabelsEnum[],
    boardId?: string,
    ticketId?: string
  ) => {
    try {
      displayLoading();
      if (action === 'CREATE') {
      }
      if (action === 'EDIT' && ticketId && labels) {
        const updatedTicket = await clientApi.updateTicket(
          title,
          description,
          labels,
          ticketId
        );
        setWorkspaceState((prevState) => {
          return helpers.updateTicketInWorkspace(prevState, updatedTicket);
        });
      }

      displaySuccessMessage(`Ticket ${action.toLowerCase()}ed successfully`);
    } catch (error) {
      displayErrorMessage(
        `Error occurred while ${action.toLowerCase()}ing tickett. Please try again later.`,
        error
      );
    }
  };

  useEffect(() => {
    if (uxFeedback.showBanner) {
      setTimeout(() => {
        setUxFeedback({ ...uxFeedback, showBanner: false, bannerMessage: '' });
      }, 2000);
    }
  }, [uxFeedback.showBanner]);

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
            handleDeleteBoard={handleDeleteBoard}
            handleBoardFormAction={handleBoardFormAction}
          />
          {board && (
            <TicketsDisplay
              tickets={board.tickets}
              handleTicketDelete={handleTicketDelete}
              handleTicketFormAction={handleTicketFormAction}
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
