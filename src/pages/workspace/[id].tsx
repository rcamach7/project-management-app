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
import { Box, Typography } from '@mui/material';

export default function Workspace_Continued() {
  const { query, push } = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      push('/');
    },
  });

  const [workspaceState, setWorkspaceState] = useState<models.Workspace>(null);
  const [activeBoard, setActiveBoard] = useState(null);
  const boardOptions: models.BoardOption[] = workspaceState?.boards.map(
    (board) => ({
      boardName: board.title,
      board_id: board._id,
    })
  );

  const board = workspaceState?.boards.find(
    (board) => board._id === activeBoard
  );

  const [uxFeedback, setUxFeedback] = useState<models.UxFeedbackState>({
    loading: false,
    showBanner: false,
    bannerMessage: '',
  });

  const displayUxMessage = (message: string, error?: any) => {
    setUxFeedback({
      loading: false,
      showBanner: true,
      bannerType: error ? 'error' : 'success',
      bannerMessage: message,
    });
    if (error) console.error(error);
  };

  const displayLoading = () => setUxFeedback({ ...uxFeedback, loading: true });

  const handleBoardChange = (boardId: string) => setActiveBoard(boardId);

  const handleTicketDelete = async (ticketId: string) => {
    try {
      displayLoading();
      await clientApi.deleteTicketByID(ticketId);
      setWorkspaceState((prevState) => {
        return helpers.deleteTicketFromWorkspace(prevState, ticketId);
      });
      displayUxMessage('Ticket deleted successfully');
    } catch (error) {
      displayUxMessage('Error deleting Ticket. Please try again later.', error);
    }
  };

  const handleDeleteBoard = async (boardId: string) => {
    try {
      displayLoading();
      await clientApi.deleteBoardByID(boardId);
      setWorkspaceState((prevState) => {
        const newState = helpers.deleteBoardFromWorkspace(prevState, boardId);
        setActiveBoard(newState.boards.length ? newState.boards[0]._id : null);
        return newState;
      });
      displayUxMessage('Board deleted successfully');
    } catch (error) {
      displayUxMessage('Error deleting board. Please try again later.', error);
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
          const newState = helpers.addBoardToWorkspace(prevState, board);
          setActiveBoard(newState.boards[newState.boards.length - 1]._id);
          return newState;
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

      displayUxMessage(`Board ${action.toLowerCase()}ed successfully`);
    } catch (error) {
      displayUxMessage(
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

      displayUxMessage(`Ticket ${action.toLowerCase()}ed successfully`);
    } catch (error) {
      displayUxMessage(
        `Error occurred while ${action.toLowerCase()}ing ticket. Please try again later.`,
        error
      );
    }
  };

  const handleMoveTicket = async (
    ticket: models.Ticket,
    sourceBoardId: string,
    destinationBoardId: string
  ) => {
    try {
      displayLoading();
      await clientApi.updateTicket(
        ticket.title,
        ticket.description,
        ticket.labels,
        ticket._id,
        destinationBoardId
      );

      setWorkspaceState((prevState) => {
        return helpers.moveTicketInWorkspace(
          prevState,
          ticket,
          sourceBoardId,
          destinationBoardId
        );
      });
      displayUxMessage('Ticket moved successfully');
    } catch (error) {
      displayUxMessage('Error moving ticket. Please try again later.', error);
    }
  };

  useEffect(() => {
    const getWorkspace = async () => {
      try {
        const workspace = await clientApi.getWorkspaceById(query.id as string);
        setWorkspaceState(workspace);
        setActiveBoard(
          workspace.boards.length ? workspace.boards[0]._id : null
        );
      } catch (error) {
        displayUxMessage(
          'Error occurred while fetching workspace. Please try again later.',
          error
        );
      }
    };
    if (query.id) {
      getWorkspace();
    }
  }, [query]);

  useEffect(() => {
    if (uxFeedback.showBanner) {
      setTimeout(() => {
        setUxFeedback({ ...uxFeedback, showBanner: false, bannerMessage: '' });
      }, 2000);
    }
  }, [uxFeedback.showBanner]);

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
        <link rel="icon" href="/hero/flow_letter.svg" />
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 0.5,
              mt: 0.5,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                p: 0.5,
                borderBottom: '1px solid #C3CDED',
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {workspaceState.name.toUpperCase()}
            </Typography>
          </Box>
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
              handleMoveTicket={handleMoveTicket}
              boardOptions={boardOptions}
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
