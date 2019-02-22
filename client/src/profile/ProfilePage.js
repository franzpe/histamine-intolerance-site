import React, { Suspense } from 'react';
import { withStyles, Paper } from '@material-ui/core';
import { Switch, Route, withRouter } from 'react-router';

import PersonalInformation from './components/personalInformation/PersonalInformation';
import UserFoods from './components/foods/UserFoods';
import ProfileSideBar from './components/ProfileSideBar';
import UserRecipes from './components/recipes/UserRecipes';
import { profileRoutes } from '_constants/routesConstants';

const styles = theme => ({
  paper: {
    minHeight: '540px',
    display: 'flex',
    width: '100%'
  },
  content: {
    flex: '0.8',
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
    verticalAlign: 'top',
    marginLeft: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      flex: '1'
    },
    overflow: 'hidden'
  }
});

function ProfilePage({ classes, match: { path } }) {
  return (
    <Paper className={classes.paper}>
      <ProfileSideBar path={path} />
      <div className={classes.content}>
        <Suspense fallback={<div />}>
          <Switch>
            <Route path={path + profileRoutes.FOOD_LIST} exact={true} component={UserFoods} />
            <Route path={path + profileRoutes.RECIPES} exact={true} component={UserRecipes} />
            <Route path={path} component={PersonalInformation} />
          </Switch>
        </Suspense>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(withRouter(ProfilePage));
