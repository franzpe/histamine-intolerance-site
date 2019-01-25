import React from 'react';
import { withStyles, Paper, Button } from '@material-ui/core';
import ListIcon from '@material-ui/icons/ViewList';
import { useQuery } from 'react-apollo-hooks';
import ReactTooltip from 'react-tooltip';
import gql from 'graphql-tag';

import Foods from './Foods';
import { AUTHENTICATION_QUERY } from '_queries/client/userQueries';
import history from '_utils/history';
import routes, { profileRoutes } from '_constants/routesConstants';

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

export const FOODS_QUERY = gql`
  {
    foods {
      id
      name
      histamineLevel {
        value
        name
      }
      totalRating
      description
    }
  }
`;

function FoodsPage({ classes }) {
  const isAuthenticated = useQuery(AUTHENTICATION_QUERY).data.isAuthenticated;
  const foodsQuery = useQuery(FOODS_QUERY);
  ReactTooltip.rebuild();

  return (
    <Paper className={classes.container}>
      {isAuthenticated && (
        <Button
          variant="text"
          size="small"
          className={classes.listButton}
          onClick={() => history.push(routes.PROFILE + profileRoutes.FOOD_LIST)}
          data-tip="Zobrazí zoznam potravín, ktoré ste hodnotili, rozdelený do vhodných a nevhodných potravín"
        >
          <ListIcon className={classes.listIcon} />
          Zobraz tvoj zoznam potravín
        </Button>
      )}
      <div className={classes.tableWrapper}>
        <Foods isRatingAllowed={true} foods={foodsQuery.data.foods} foodsQuery={foodsQuery} />
      </div>
    </Paper>
  );
}

export default withStyles(styles)(FoodsPage);
