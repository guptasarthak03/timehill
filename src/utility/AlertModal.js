import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertModal = props => {
  const { showModal, setShowModal, title, description } = props;

  const handleYesBtn = () => {
    props.actionOnYes();
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Dialog
      open={showModal}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {description && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleYesBtn}>Yes</Button>
        <Button onClick={handleClose} autoFocus>
          NO
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertModal;
