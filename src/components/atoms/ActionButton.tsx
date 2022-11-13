import { Button, ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
  text: string;
  size?: 'small' | 'medium' | 'large';
  variant: 'contained' | 'outlined';
  onClick?: () => void;
  sx?: {};
}

export default function ActionButton({
  text,
  variant,
  size,
  sx,
  onClick,
}: Props) {
  return (
    <Button
      variant={variant}
      size={size ? size : 'large'}
      sx={{
        color: 'text.primary',
        ...sx,
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
