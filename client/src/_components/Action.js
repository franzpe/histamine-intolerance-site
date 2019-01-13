import React from 'react';
import { IconButton, withStyles } from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
  action: {
    '&:hover': {
      color: theme.palette.secondary.main
    }
  }
});

function Action({ classes, children, className, ...restProps }) {
  return (
    <IconButton className={classNames(classes.action, className)} {...restProps}>
      {children}
    </IconButton>
  );
}

export default withStyles(styles)(Action);
