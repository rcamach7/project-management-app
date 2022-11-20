import { WorkspaceSummary as WorkspaceSummaryType } from 'models/global';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import UsersSummary from './UsersSummary';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';

interface Props {
  workspace: WorkspaceSummaryType;
}

export default function WorkspaceSummary({ workspace }: Props) {
  const { _id, description, name, owner, users } = workspace;

  return (
    <Card
      sx={{ width: 325, height: 200, display: 'flex', flexDirection: 'column' }}
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
              sx={{ color: 'secondary.main', pl: 1, cursor: 'pointer' }}
            >
              Launch
            </Typography>
          </Link>
        </Button>
        <Button size="small" sx={{ color: 'secondary.main' }}>
          Edit
        </Button>
        <Button
          size="small"
          sx={{ color: 'red', fontSize: 13 }}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
