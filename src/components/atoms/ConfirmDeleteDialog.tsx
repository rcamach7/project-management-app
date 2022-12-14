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
  asset_id: string;
  handleClose: () => void;
  handleDelete: (_id: string) => void;
}

export default function ConfirmDeleteDialog({
  title,
  content,
  open,
  asset_id,
  handleClose,
  handleDelete,
}: Props) {
  const handleSubmit = async () => {
    handleClose();
    handleDelete(asset_id);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-delete-dialog"
      aria-describedby="alert-confirm-deletion"
    >
      <DialogTitle id="alert-delete-dialog">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-confirm-deletion">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: 'text.primary' }} onClick={handleClose}>
          Cancel
        </Button>
        <Button sx={{ color: 'red' }} onClick={handleSubmit} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
