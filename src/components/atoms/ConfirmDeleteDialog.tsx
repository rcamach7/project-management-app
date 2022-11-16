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
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

export default function ConfirmDeleteDialog({
  title,
  content,
  open,
  handleClose,
  handleConfirm,
}: Props) {
  return (
    <div>
      <Button variant="outlined">Open alert dialog</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: 'text.primary' }} onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{ color: 'red' }} onClick={handleConfirm} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
