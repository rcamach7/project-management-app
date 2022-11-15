import { CenteredBox } from '@/components/layout/index';
import { ActionButton } from '@/components/atoms/index';

export default function TabButtons() {
  return (
    <CenteredBox
      sx={{
        flexDirection: 'row',
        pt: 2,
        gap: { xs: '1.2em', sm: '2em', md: '3em' },
      }}
    >
      <ActionButton
        text="Create New Board"
        variant="outlined"
        size="small"
        sx={{
          fontSize: { xs: '.7em', sm: '.7em', md: '.8em' },
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
          fontSize: { xs: '.7em', sm: '.7em', md: '.8em' },
          color: 'secondary.main',
          border: 1,
          borderColor: 'secondary.main',
          p: '2px 4px',
        }}
      />
    </CenteredBox>
  );
}
