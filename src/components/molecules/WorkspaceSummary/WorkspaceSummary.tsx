import { WorkspaceSummary as WorkspaceSummaryType } from 'models/global';
import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { WorkspaceForm } from '@/components/molecules/index';
import UsersSummary from './UsersSummary';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import { FormStatus } from 'models/client';

interface Props {
  userId: string;
  workspace: WorkspaceSummaryType;
  handleWorkspaceFormAction: (
    action: FormStatus['action'],
    title: string,
    description: string,
    workspaceId?: string
  ) => Promise<void>;
}

export default function WorkspaceSummary({
  userId,
  workspace,
  handleWorkspaceFormAction,
}: Props) {
  const { _id, description, name, owner, users } = workspace;
  const [formStatus, setFormStatus] = useState<FormStatus>({
    show: false,
    action: 'CREATE',
  });

  return (
    <>
      <Card
        sx={{
          width: 325,
          height: 200,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', pb: 0 }}>
          <Typography variant="caption" component="p" sx={{ fontSize: 10 }}>
            {_id}
          </Typography>
          <Typography gutterBottom variant="h6" component="p">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <UsersSummary users={users} owner={owner} />
        </CardContent>
        <CardActions sx={{ mt: 'auto' }}>
          <Button size="small" sx={{ color: 'secondary.main' }}>
            <Link href={`workspace/${_id}`}>
              <Typography
                sx={{
                  color: 'secondary.main',
                  pl: 1,
                  cursor: 'pointer',
                  fontSize: 14,
                }}
              >
                Launch
              </Typography>
            </Link>
          </Button>
          <Button
            size="small"
            sx={{ color: 'secondary.main' }}
            onClick={() => setFormStatus({ show: true, action: 'EDIT' })}
          >
            Edit
          </Button>
          {workspace.owner._id === userId && (
            <Button
              size="small"
              sx={{ color: 'red', fontSize: 13 }}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
      {formStatus.show && (
        <WorkspaceForm
          action={formStatus.action}
          workspace={workspace}
          handleClose={() => setFormStatus({ show: false, action: 'EDIT' })}
          handleWorkspaceFormAction={handleWorkspaceFormAction}
        />
      )}
    </>
  );
}
