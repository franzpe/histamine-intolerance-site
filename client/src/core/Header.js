import React, { Fragment } from 'react';
import { withStyles, Toolbar, Typography, IconButton, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import history from '../_utils/history';
import routes from '../_constants/routesConstants';
import { teal } from '@material-ui/core/colors';

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  toolbarTitle: {
    flex: 1
  },
  section: {
    marginRight: theme.spacing.unit * 5,
    textDecoration: 'none',
    color: 'inherit'
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  activeSection: {
    color: theme.palette.secondary.main
  }
});

const sections = [
  { to: routes.RECIPES, label: 'Recipes' },
  { to: routes.FOODS, label: 'Groceries' }
];

function Header({ classes }) {
  return (
    <Fragment>
      <Toolbar className={classes.toolbarMain}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          Blog
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={e => {
            e.preventDefault();
            history.push(routes.LOGIN);
          }}
        >
          Sign up
        </Button>
      </Toolbar>
      <Toolbar variant="dense">
        {sections.map((section, index) => (
          <NavLink
            key={index}
            to={section.to}
            className={classes.section}
            activeClassName={classes.activeSection}
          >
            {section.label}
          </NavLink>
        ))}
      </Toolbar>
    </Fragment>
  );
}

export default withStyles(styles)(Header);
