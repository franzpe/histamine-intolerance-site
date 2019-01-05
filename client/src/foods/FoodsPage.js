import React from 'react';
import { withStyles, Paper, Button } from '@material-ui/core';
import ListIcon from '@material-ui/icons/ViewList';
import { useQuery } from 'react-apollo-hooks';

import Foods from './Foods';
import { AUTHENTICATION_QUERY } from '_queries/client/userQueries';

const styles = theme => ({
  tableWrapper: {
    overflowX: 'auto'
  },
  listIcon: {
    marginRight: theme.spacing.unit
  },
  container: {
    textAlign: 'right'
  },
  listButton: {
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit}px`
  }
});

function FoodsPage({ classes }) {
  const isAuthenticated = useQuery(AUTHENTICATION_QUERY).data.isAuthenticated;

  return (
    <Paper className={classes.container}>
      {isAuthenticated && (
        <Button variant="text" size="small" className={classes.listButton}>
          <ListIcon className={classes.listIcon} />
          Show your grocery list
        </Button>
      )}
      <div className={classes.tableWrapper}>
        <Foods />
      </div>
    </Paper>
  );
}

export default withStyles(styles)(FoodsPage);
