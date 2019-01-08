import React from 'react';
import { ToastContainer } from 'react-toastify';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  toast: {
    borderRadius: '5px !important',
    fontFamily: 'Roboto !important',
    fontSize: '14px !important',
    fontWeight: 600,
    letterSpacing: '0.5px',
    boxShadow: '1px 0 10px rgba(0,0,0,0.55) !important'
  }
});

function ToastInit({ classes }) {
  return <ToastContainer toastClassName={classes.toast} />;
}

export default withStyles(styles)(ToastInit);
