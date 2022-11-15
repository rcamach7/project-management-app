import Head from 'next/head';
import { useState } from 'react';
import { unstable_getServerSession } from 'next-auth/next';
import { AppSession } from 'models/global';
import { authOptions } from '@/auth/[...nextauth]';
import { getWorkspaceById } from 'controllers/workspaceController';
import { ResponsiveAppBar, BoardTabBar } from '@/components/organisms/index';
import { PageTitle } from '@/components/atoms/index';
import { BoardDisplay } from '@/components/organisms/index';
import { Workspace } from 'models/client';
import { Box } from '@mui/material';

export default function Workspace_Continued({ mySession, workspace }) {
  const { user }: AppSession = JSON.parse(mySession);
  const { _id, boards, description, owner, users, name }: Workspace =
    JSON.parse(workspace);

  const [activeBoard, setActiveBoard] = useState(
    boards.length ? boards[0]._id : ''
  );
  const board = boards.find((board) => board._id === activeBoard);

  const handleBoardChange = (boardId: string) => {
    setActiveBoard(boardId);
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
          <PageTitle subheading={name} sx={{ pt: 1 }} />
          <BoardTabBar
            boards={boards}
            activeBoard={activeBoard}
            handleBoardChange={handleBoardChange}
          />
          {board && <BoardDisplay board={board} />}
        </Box>
      </Box>
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
