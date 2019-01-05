import React from 'react';
import { withStyles, Paper } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import ListIcon from '@material-ui/icons/List';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { blue } from '@material-ui/core/colors';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Switch, Route, withRouter } from 'react-router';
import PersonalInformation from './components/PersonalInformation';

const styles = theme => ({
  paper: {
    minHeight: '540px',
    display: 'flex',
    width: '100%'
  },
  sidebar: {
    backgroundColor: blue[100],
    flex: '0.2',
    minWidth: '206px',
    padding: `${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down('xs')]: {
      minWidth: '60px',
      flex: '0'
    }
  },
  sidebarItem: {
    height: `${theme.spacing.unit * 4}px`,
    display: 'flex',
    alignItems: 'center'
  },
  sidebarItemDescription: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  sidebarItemIcon: {
    marginRight: `${theme.spacing.unit}px`,
    fontSize: '28px',
    [theme.breakpoints.down('xs')]: {
      marginRight: '0px'
    }
  },
  navLink: {
    color: 'black',
    textDecoration: 'none'
  },
  activeNavLink: {
    color: theme.palette.secondary.main
  },

  content: {
    flex: '0.8',
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
    verticalAlign: 'top',
    marginLeft: `${theme.spacing.unit}px`,
    [theme.breakpoints.down('xs')]: {
      flex: '1'
    }
  }
});

function ProfilePage({ classes, match: { path } }) {
  return (
    <Paper className={classes.paper}>
      <div className={classes.sidebar}>
        <NavLink
          to={`${path}/personal-information`}
          activeClassName={classes.activeNavLink}
          className={classNames(classes.sidebarItem, classes.navLink)}
        >
          <FaceIcon className={classes.sidebarItemIcon} />
          <span className={classes.sidebarItemDescription}>Osobné informácie</span>
        </NavLink>
        <NavLink
          to={`${path}/food-list`}
          activeClassName={classes.activeNavLink}
          className={classNames(classes.sidebarItem, classes.navLink)}
        >
          <ListIcon className={classes.sidebarItemIcon} />
          <span className={classes.sidebarItemDescription}>Zoznam potravín</span>
        </NavLink>
        <NavLink
          to={`${path}/recipes`}
          activeClassName={classes.activeNavLink}
          className={classNames(classes.sidebarItem, classes.navLink)}
        >
          <ReceiptIcon className={classes.sidebarItemIcon} />
          <span className={classes.sidebarItemDescription}>Recepty</span>
        </NavLink>
      </div>
      <div className={classes.content}>
        <Switch>
          <Route path={path + '/food-list'} exact={true} component={() => <div>Food list</div>} />
          <Route path={path + '/recipes'} exact={true} component={() => <div>Recipes</div>} />
          <Route path={path} component={PersonalInformation} />
        </Switch>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(withRouter(ProfilePage));
