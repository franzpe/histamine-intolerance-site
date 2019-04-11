import React, { Fragment } from 'react';
import { withStyles, Fab, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import UserRecipesTable from './UserRecipesTable';
import history from '_utils/history';
import routes from '_constants/routesConstants';

const styles = theme => ({
  btnContainer: {
    textAlign: 'right',
    marginBottom: theme.spacing.unit / 2
  },
  recipesContainer: {
    overflow: 'auto'
  }
});

function UserRecipes({ classes }) {
  function handleAddRecipe(e) {
    history.push({ pathname: routes.ADD_RECIPE, state: { backpath: history.location.pathname } });
  }

  return (
    <Fragment>
      <div className={classes.btnContainer}>
        <Tooltip title="Pridaj recept" enterDelay={500} leaveDelay={200}>
          <Fab color="primary" aria-label="Add" className={classes.fab} onClick={handleAddRecipe}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
      <div className={classes.recipesContainer}>
        <UserRecipesTable />
      </div>
    </Fragment>
  );
}

export default withStyles(styles)(UserRecipes);
