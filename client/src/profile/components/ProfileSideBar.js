import React from 'react';
import { withStyles } from '@material-ui/core';

import FaceIcon from '@material-ui/icons/Face';
import ListIcon from '@material-ui/icons/List';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const styles = theme => ({
  sidebar: {
    backgroundColor: '#FAFAFA',
    flex: '0.2',
    minWidth: '206px',
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down('xs')]: {
      minWidth: '60px',
      flex: '0'
    }
  },
  sidebarItem: {
    marginBottom: theme.spacing.unit / 2,
    height: theme.spacing.unit * 4,
    display: 'flex',
    alignItems: 'center'
  },
  sidebarItemDescription: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  sidebarItemIcon: {
    marginRight: theme.spacing.unit,
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
  }
});

function ProfileSideBar({ path, classes }) {
  return (
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
        <span className={classes.sidebarItemDescription}>Moje recepty</span>
      </NavLink>
    </div>
  );
}

export default withStyles(styles)(ProfileSideBar);
