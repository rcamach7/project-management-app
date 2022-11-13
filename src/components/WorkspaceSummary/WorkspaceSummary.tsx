import { WorkspaceSummary as WorkspaceSummaryType } from 'models/global';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from '@mui/material';
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
          <Typography variant="caption" component="div">
            {_id}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
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
// {
//   _id: '63561b0b8c97ea7fec727a90',
//   name: 'Cool Workspace Project',
//   description: 'This is a cool workspace project description',
//   owner: {
//     _id: '634084c70984362d0a83f1c0',
//     name: 'Ricardo Camacho Mireles',
//     image: 'https://lh3.googleusercontent.com/a/ALm5wu1jsD0XJy9Fuj72soNltZGBmuh0knEKq9rAaLPLnw=s96-c'
//   },
//   users: [ [Object] ]
// },
