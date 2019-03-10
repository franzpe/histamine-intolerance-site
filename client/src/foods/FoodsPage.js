import React, { PureComponent, Suspense } from 'react';
import { withStyles, Paper, Button, Tooltip, CircularProgress } from '@material-ui/core';
import ListIcon from '@material-ui/icons/ViewList';
import { Query } from 'react-apollo';

import Foods from './Foods';
import { AUTHENTICATION_QUERY } from '_queries/client/userQueries';
import history from '_utils/history';
import routes, { profileRoutes } from '_constants/routesConstants';
import SuspenseWithCenteredCircularFallback from '_components/SuspenseWithCenteredCircularFallback';

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

class FoodsPage extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.container}>
        <Query query={AUTHENTICATION_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return null;

            return (
              data.isAuthenticated && (
                <Tooltip
                  title="Zobrazí zoznam potravín, ktoré ste hodnotili, pričom je rozdelený do vhodných a nevhodných potravín"
                  enterDelay={500}
                  leaveDelay={200}
                >
                  <Button
                    variant="text"
                    size="small"
                    className={classes.listButton}
                    onClick={() => history.push(routes.PROFILE + profileRoutes.FOOD_LIST)}
                  >
                    <ListIcon className={classes.listIcon} />
                    Zobraz tvoj zoznam potravín
                  </Button>
                </Tooltip>
              )
            );
          }}
        </Query>
        <div className={classes.tableWrapper}>
          <SuspenseWithCenteredCircularFallback>
            <Foods />
          </SuspenseWithCenteredCircularFallback>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(FoodsPage);
