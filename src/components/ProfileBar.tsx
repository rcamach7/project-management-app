import { AppSession } from 'models/global';
import { Box, Typography } from '@mui/material';
import { CenteredBox } from '@/components/index';
import Image from 'next/image';

interface Props {
  user: AppSession['user'];
}

export default function ProfileBar({ user }: Props) {
  return (
    <Box
      sx={{
        minWidth: '300px',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: 1,
        border: 1,
        p: 1,
      }}
    >
      <Box
        sx={{
          width: { xs: '5.5em', sm: '6em', md: '6.5em' },
          height: { xs: '5.5em', sm: '6em', md: '6.5em' },
          overflow: 'hidden',
          borderRadius: '50%',
        }}
      >
        <Image src={user.image} width="50" height="50" layout="responsive" />
      </Box>
      <Box sx={{ p: 0.5 }}>
        <Typography sx={{ fontSize: { xs: '1em', sm: '1.1em', md: '1.2em' } }}>
          Hello,
        </Typography>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.2em', sm: '1.4em', md: '1.6em' },
          }}
        >
          {user.name}
        </Typography>
        <Typography>Sign Out</Typography>
      </Box>
    </Box>
  );
}
