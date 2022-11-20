import Head from 'next/head';
import { useState } from 'react';
import { authOptions } from '@/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import { AppSession } from 'models/global';
import { ImageButton, InformationDialog } from '@/components/atoms/index';
import {
  ProfileBar,
  WorkspaceSummary,
  WorkspaceForm,
} from '@/components/molecules/index';
import { CenteredBox } from '@/components/layout/index';
import { Box, Typography } from '@mui/material';
import { FormStatus, UxFeedbackState } from 'models/client';
import clientApi from '@/lib/clientApi';
import helpers from '@/lib/helpers';

export default function Me({ mySession }) {
  const [session, setSession] = useState<AppSession>(JSON.parse(mySession));

  const [formStatus, setFormStatus] = useState<FormStatus>({
    show: false,
    action: 'CREATE',
  });
  const [informationDialog, setInformationDialog] = useState({
    show: false,
    title: '',
    content: '',
  });

  const closeInformationDialog = () =>
    setInformationDialog({ show: false, title: '', content: '' });

  const handleWorkspaceFormAction = async (
    action: FormStatus['action'],
    title: string,
    description: string,
    workspaceId?: string
  ) => {
    try {
      if (action === 'CREATE') {
        const newWorkspace = await clientApi.createWorkspace(
          title,
          description
        );
        setSession(helpers.addWorkspaceToUserSession(session, newWorkspace));
      }
      if (action === 'EDIT' && workspaceId) {
        const updatedWorkspace = await clientApi.editWorkspace(
          title,
          description,
          workspaceId
        );
        setSession(
          helpers.updateWorkspaceInUserSession(session, updatedWorkspace)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Flow: Account</title>
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          maxWidth: '900px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ProfileBar user={session.user} />
        <CenteredBox
          sx={{ p: 3, flexDirection: 'row', justifyContent: 'space-evenly' }}
        >
          <ImageButton
            text="New Project"
            image="/buttons/plus.svg"
            onClick={() => setFormStatus({ show: true, action: 'CREATE' })}
          />
          <ImageButton
            text="Invitations"
            image="/buttons/invite.svg"
            onClick={() =>
              setInformationDialog({
                show: true,
                title: 'Invitations feature is currently being worked on',
                content: 'Please check back later!',
              })
            }
          />
          <ImageButton
            text="Templates"
            image="/buttons/template.svg"
            onClick={() =>
              setInformationDialog({
                show: true,
                title: 'Templates feature is currently being worked on',
                content: 'Please check back later!',
              })
            }
          />
        </CenteredBox>

        <Typography textAlign="center" pb={1} sx={{ fontWeight: 'bold' }}>
          My Workspaces
        </Typography>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            justifyContent: 'center',
            gap: { xs: 1, sm: 2, md: 5, lg: 7 },
            overflow: 'scroll',
          }}
        >
          {session.user.workspaces.map((workspace) => (
            <WorkspaceSummary
              key={workspace._id}
              workspace={workspace}
              handleWorkspaceFormAction={handleWorkspaceFormAction}
            />
          ))}
        </Box>
      </Box>
      {informationDialog.show && (
        <InformationDialog
          title={informationDialog.title}
          content={informationDialog.content}
          handleClose={closeInformationDialog}
        />
      )}
      {formStatus.show && (
        <WorkspaceForm
          action={formStatus.action}
          handleClose={() => setFormStatus({ show: false, action: 'CREATE' })}
          handleWorkspaceFormAction={handleWorkspaceFormAction}
        />
      )}
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session: AppSession = await unstable_getServerSession(
    req,
    res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } else {
    const mySession = JSON.stringify(session);
    return {
      props: {
        mySession,
      },
    };
  }
}
