import { LabelsEnum } from 'models/client';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

interface Props {
  labels: LabelsEnum[];
  mobile: boolean;
}

export default function LabelsDisplay({ labels, mobile }: Props) {
  const responsiveStyling = {
    display: { xs: mobile ? 'block' : 'none', sm: mobile ? 'none' : 'block' },
  };

  return (
    <Stack direction="row" spacing={1} sx={{ pb: 1, ...responsiveStyling }}>
      {labels.map((label) => (
        <Chip
          key={label}
          label={label}
          variant="outlined"
          onDelete={() => {}}
          size="small"
          sx={{ fontSize: '10px' }}
        />
      ))}
    </Stack>
  );
}
