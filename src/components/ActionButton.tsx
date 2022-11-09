import { Button } from '@mui/material';

interface Props {
  text: string;
}

export default function ActionButton({ text }: Props) {
  return (
    <Button variant="contained" size="large">
      {text}
    </Button>
  );
}
