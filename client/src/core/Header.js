import React, { Fragment } from 'react';
import { withStyles, Toolbar, Typography, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import history from '../_utils/history';
import routes from '../_constants/routesConstants';
import { showErrorToast } from '../_utils/toast';
import jwt from '../_utils/jwt';
import FacebookLoginBtn from '_components/buttons/FacebookLoginBtn';
import { AUTHENTICATION_QUERY } from '_queries/client/userQueries';

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
  },
  profile: {
    marginRight: theme.spacing.unit
  },
  facebook: {
    marginRight: theme.spacing.unit,
    cursor: 'pointer'
  }
});

const sections = [
  { to: routes.RECIPES, label: 'Recipes' },
  { to: routes.FOODS, label: 'Groceries' }
];

const LOGOUT_MUTATION = gql`
  mutation logout {
    logout @client
  }
`;

function Header({ classes }) {
  const { isAuthenticated } = useQuery(AUTHENTICATION_QUERY).data;
  const logout = useMutation(LOGOUT_MUTATION);

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
          HIT
        </Typography>
        {!isAuthenticated ? (
          <Fragment>
            <FacebookLoginBtn className={classes.facebook} />
            <Button
              variant="outlined"
              size="small"
              onClick={e => {
                history.push(routes.LOGIN);
              }}
            >
              Prihlásiť
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Button
              variant="outlined"
              size="small"
              className={classes.profile}
              onClick={() => history.push(routes.PROFILE)}
            >
              Profile
            </Button>
            <Button variant="contained" size="small" color="primary" onClick={handleLogout}>
              Odhlásiť
            </Button>
          </Fragment>
        )}
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

  function handleLogout(e) {
    logout();
    jwt.removeAll();
    showErrorToast('Boli ste odhlásený');
  }
}

export default withStyles(styles)(Header);
