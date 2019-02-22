import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

function ConfirmationDialog({ title, contentText, open, onClose }) {
  return (
    <div>
      <Dialog open={open} onClose={e => onClose(false, e)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={e => onClose(true, e)} color="primary">
            Áno
          </Button>
          <Button onClick={e => onClose(false, e)} color="secondary">
            Zrušiť
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  contentText: PropTypes.string.isRequired
};

export default ConfirmationDialog;
