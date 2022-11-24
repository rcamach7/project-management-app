import Head from 'next/head';
import clientApi from '@/lib/clientApi';
import helpers from '@/lib/helpers';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import * as models from 'models/client';
import {
  ResponsiveAppBar,
  BoardTabBar,
  TicketsDisplay,
} from '@/components/organisms/index';
import { PageTitle } from '@/components/atoms/index';
import { UxFeedback } from '@/components/molecules/index';
import { Box } from '@mui/material';

export default function Workspace_Continued() {
  const { data: session, status } = useSession();
  const [workspaceState, setWorkspaceState] = useState<models.Workspace>(null);
  const { query } = useRouter();
  const [uxFeedback, setUxFeedback] = useState<models.UxFeedbackState>({
    loading: false,
    showBanner: false,
    bannerMessage: '',
  });

  const [activeBoard, setActiveBoard] = useState(
    workspaceState?.boards.length ? workspaceState.boards[0]._id : ''
  );
  const board = workspaceState?.boards.find(
    (board) => board._id === activeBoard
  );

  const handleBoardChange = (boardId: string) => setActiveBoard(boardId);

  const resetActiveBoard = () => setActiveBoard(workspaceState.boards[0]._id);

  const displaySuccessMessage = (message: string) =>
    setUxFeedback({
      loading: false,
      showBanner: true,
      bannerType: 'success',
      bannerMessage: message,
    });

  const displayErrorMessage = (message: string, error: any) => {
    setUxFeedback({
      loading: false,
      showBanner: true,
      bannerType: 'error',
      bannerMessage: message,
    });
    console.error(error);
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
    action: models.FormStatus['action'],
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
    action: models.FormStatus['action'],
    title: string,
    description: string,
    labels?: models.LabelsEnum[],
    boardId?: string,
    ticketId?: string
  ) => {
    try {
      displayLoading();
      if (action === 'CREATE' && boardId) {
        const newTicket = await clientApi.createTicket(
          title,
          description,
          labels ? labels : [],
          boardId
        );
        setWorkspaceState((prevState) => {
          return helpers.addTicketToWorkspaceBoard(prevState, newTicket);
        });
      }
      if (action === 'EDIT' && ticketId) {
        const updatedTicket = await clientApi.updateTicket(
          title,
          description,
          labels ? labels : [],
          ticketId
        );
        setWorkspaceState((prevState) => {
          return helpers.updateTicketInWorkspace(prevState, updatedTicket);
        });
      }

      displaySuccessMessage(`Ticket ${action.toLowerCase()}ed successfully`);
    } catch (error) {
      displayErrorMessage(
        `Error occurred while ${action.toLowerCase()}ing ticket. Please try again later.`,
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

  useEffect(() => {
    const getWorkspace = async () => {
      try {
        const workspace = await clientApi.getWorkspaceById(query.id as string);
        setWorkspaceState(workspace);
      } catch (error) {
        displayErrorMessage(
          'Error occurred while fetching workspace. Please try again later.',
          error
        );
      }
    };
    if (query.id) {
      getWorkspace();
    }
  }, [query]);

  if (!workspaceState || status === 'loading' || session.user === null) {
    return (
      <UxFeedback
        loading={true}
        showBanner={false}
        bannerMessage={''}
        bannerType={'success'}
      />
    );
  }
  return (
    <>
      <Head>
        <title>Flow: Workspace</title>
        <link rel="icon" href="/hero/f.svg" />
      </Head>

      <Box
        sx={{
          minWidth: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ResponsiveAppBar name={session.user.name} image={session.user.image} />
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
              boardId={board._id}
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
