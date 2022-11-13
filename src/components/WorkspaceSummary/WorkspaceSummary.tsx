import { WorkspaceSummary as WorkspaceSummaryType } from 'models/global';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import UsersSummary from './UsersSummary';

interface Props {
  workspace: WorkspaceSummaryType;
}

export default function WorkspaceSummary({ workspace }: Props) {
  const { _id, description, name, owner, users } = workspace;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
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
