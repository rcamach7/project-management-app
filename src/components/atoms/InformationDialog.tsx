import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material/';

interface Props {
  title: string;
  content: string;
  handleClose: () => void;
}

export default function InformationDialog({
  title,
  content,
  handleClose,
}: Props) {
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-information-title"
      aria-describedby="alert-dialog-information"
    >
      <DialogTitle id="alert-dialog-information-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-information">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
