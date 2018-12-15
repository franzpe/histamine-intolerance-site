import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  footer: {
    height: '80px',
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const Footer = ({ classes }) => {
  return <div className={classes.footer}>© 2018 Applance. Všetky práva vyhradené.</div>;
};

export default withStyles(styles)(Footer);
