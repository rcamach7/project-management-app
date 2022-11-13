import { AppSession } from 'models/global';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { Box, Typography } from '@mui/material';
import { ActionButton } from '@/components/atoms/index';

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
        justifyContent: { xs: 'center', sm: 'flex-start' },
        alignItems: 'center',
        gap: { xs: 1, sm: 2, md: 3 },
        borderBottom: { xs: 1, lg: 0 },
        p: 1,
      }}
    >
      <Box
        sx={{
          width: { xs: '5.5em', sm: '6em', md: '6.5em' },
          height: { xs: '5.5em', sm: '6em', md: '6.5em' },
          overflow: 'hidden',
          borderRadius: '50%',
          border: 2,
          borderColor: 'secondary.main',
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
          gutterBottom
        >
          {user.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ActionButton
            text="Sign Out"
            variant="outlined"
            size="small"
            onClick={signOut}
            sx={{
              fontSize: { xs: '.5em', sm: '.7em', md: '.9em' },
              color: 'secondary.main',
              border: 1,
              borderColor: 'secondary.main',
              p: '2px 4px',
            }}
          />
          <ActionButton
            text="Settings"
            variant="outlined"
            size="small"
            sx={{
              fontSize: { xs: '.5em', sm: '.7em', md: '.9em' },
              color: 'secondary.main',
              border: 1,
              borderColor: 'secondary.main',
              p: '2px 4px',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
