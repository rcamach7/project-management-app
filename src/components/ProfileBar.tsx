import { AppSession } from 'models/global';
import { Box } from '@mui/material';
import { CenteredBox } from '@/components/index';
import Image from 'next/image';

interface Props {
  user: AppSession['user'];
}

export default function ProfileBar({ user }: Props) {
  return (
    <CenteredBox sx={{ flexDirection: 'row', border: 1 }}>
      <Box
        sx={{
          width: '5em',
          height: '5em',
          overflow: 'hidden',
          borderRadius: 10,
        }}
      >
        <Image src={user.image} width="50" height="50" layout="responsive" />
      </Box>
      <Box>Box</Box>
    </CenteredBox>
  );
}
