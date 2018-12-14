import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  footer: {
    height: '100px',
    backgroundColor: theme.palette.secondary.main
  }
});

const Footer = ({ classes }) => {
  return <div className={classes.footer}> Footer </div>;
};

export default withStyles(styles)(Footer);
