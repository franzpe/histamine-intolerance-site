import React, { Suspense } from 'react';
import { withStyles, Paper } from '@material-ui/core';
import { Switch, Route, withRouter } from 'react-router';

import PersonalInformation from './components/PersonalInformation';
import UserFoods from './components/UserFoods';
import ProfileSideBar from './components/ProfileSideBar';

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
    marginLeft: `${theme.spacing.unit}px`,
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
            <Route path={path + '/food-list'} exact={true} component={UserFoods} />
            <Route path={path + '/recipes'} exact={true} component={() => <div>Recipes</div>} />
            <Route path={path} component={PersonalInformation} />
          </Switch>
        </Suspense>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(withRouter(ProfilePage));
