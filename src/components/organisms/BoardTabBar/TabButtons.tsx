import { CenteredBox } from '@/components/layout/index';
import { ActionButton } from '@/components/atoms/index';

export default function TabButtons() {
  return (
    <CenteredBox
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        pt: 2,
      }}
    >
      <ActionButton
        text="Create New Board"
        variant="outlined"
        size="small"
        sx={{
          fontSize: { xs: '.7em', sm: '.9em', md: '1em' },
          color: 'secondary.main',
          border: 1,
          borderColor: 'secondary.main',
          p: '2px 4px',
        }}
      />
      <ActionButton
        text="Delete Board"
        variant="outlined"
        size="small"
        sx={{
          fontSize: { xs: '.7em', sm: '.9em', md: '1em' },
          color: 'secondary.main',
          border: 1,
          borderColor: 'secondary.main',
          p: '2px 4px',
        }}
      />
    </CenteredBox>
  );
}
