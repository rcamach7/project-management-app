import { WorkspaceSummary as WorkspaceSummaryType } from 'models/global';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import UsersSummary from './UsersSummary';
import { NextLinkAnchor } from '@/components/atoms/index';

interface Props {
  workspace: WorkspaceSummaryType;
}

export default function WorkspaceSummary({ workspace }: Props) {
  const { _id, description, name, owner, users } = workspace;

  return (
    <Card
      component={NextLinkAnchor}
      to={`workspace/${workspace._id}`}
      sx={{ width: 325, height: 175 }}
    >
      <CardActionArea sx={{ height: '100%' }}>
        <CardContent
          sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
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
      </CardActionArea>
    </Card>
  );
}
