import React from 'react';
import { withStyles, Button } from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
  btn: {
    width: '112px'
  }
});

function FormBtn({ classes, className, children, ...restProps }) {
  return (
    <Button
      type="submit"
      variant="contained"
      size="small"
      className={classNames(classes.btn, className)}
      {...restProps}
    >
      {children}
    </Button>
  );
}

export default withStyles(styles)(FormBtn);
