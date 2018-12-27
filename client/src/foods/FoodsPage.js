import React from 'react';
import { withStyles, Paper } from '@material-ui/core';

import Foods from './Foods';

const styles = theme => ({
  tableWrapper: {
    overflowX: 'auto'
  }
});

function FoodsPage({ classes }) {
  return (
    <Paper>
      <div className={classes.tableWrapper}>
        <Foods />
      </div>
    </Paper>
  );
}

export default withStyles(styles)(FoodsPage);
