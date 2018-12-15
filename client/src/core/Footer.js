import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  footer: {
    height: '80px',
    borderTop: '1px solid #e0e0e0'
  }
});

const Footer = ({ classes }) => {
  return <div className={classes.footer}> Footer </div>;
};

export default withStyles(styles)(Footer);
