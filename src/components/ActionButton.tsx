import { Button } from '@mui/material';

interface Props {
  text: string;
  variant: 'contained' | 'outlined';
  onClick?: () => void;
}

export default function ActionButton({ text, variant, onClick }: Props) {
  return (
    <Button
      variant={variant}
      size="large"
      sx={{
        color: 'text.primary',
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}