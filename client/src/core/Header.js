import React, { Fragment } from 'react';
import { withStyles, Toolbar, Typography, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import history from '../_utils/history';
import routes, { profileRoutes } from '../_constants/routesConstants';
import { showErrorToast } from '../_utils/toast';
import jwt from '../_utils/jwt';
import FacebookLoginBtn from '_components/buttons/FacebookLoginBtn';
import { AUTHENTICATION_QUERY } from '_queries/client/userQueries';

const styles = theme => ({
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    padding: `${theme.spacing.unit * 2}px 0`
  },
  appBar: {
    position: 'relative'
  },
  toolbarTitleWrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center'
  },
  toolbarTitle: {
    cursor: 'pointer',
    display: 'inline-block',
    width: 'auto',
    fontWeight: 300,
    fontSize: '48px'
  },
  section: {
    marginRight: theme.spacing.unit * 5,
    textDecoration: 'none',
    color: 'inherit'
  },
  activeSection: {
    color: theme.palette.secondary.main
  },
  profile: {
    marginRight: theme.spacing.unit
  },
  facebook: {
    height: '39px',
    width: '39px',
    marginRight: theme.spacing.unit,
    cursor: 'pointer',
    verticalAlign: 'middle'
  }
});

const sections = [
  { to: routes.RECIPES, label: 'Recepty' },
  { to: routes.FOODS, label: 'Zoznam potravín' }
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
        {!isAuthenticated ? (
          <div style={{ visibility: 'hidden' }}>
            <FacebookLoginBtn className={classes.facebook} />
            <Button variant="outlined" size="medium" onClick={handleLogin}>
              Prihlásiť
            </Button>
          </div>
        ) : (
          <div style={{ visibility: 'hidden' }}>
            <Button variant="outlined" size="medium" className={classes.profile}>
              Profil
            </Button>
            <Button variant="contained" size="medium">
              Odhlásiť
            </Button>
          </div>
        )}
        <div className={classes.toolbarTitleWrapper}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap={true}
            className={classes.toolbarTitle}
            onClick={() => history.push(routes.RECIPES)}
          >
            <span className={classes.activeSection} style={{ fontWeight: 600 }}>
              BEZ
            </span>
            HISTAMÍNOVO
          </Typography>
        </div>
        {!isAuthenticated ? (
          <Fragment>
            <FacebookLoginBtn className={classes.facebook} />
            <Button variant="outlined" size="medium" onClick={handleLogin}>
              Prihlásiť
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Button
              variant="outlined"
              size="medium"
              className={classes.profile}
              onClick={() => history.push(routes.PROFILE + profileRoutes.PERSONAL_INFORMATION)}
            >
              Profil
            </Button>
            <Button variant="contained" size="medium" color="primary" onClick={handleLogout}>
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

  function handleLogin(e) {
    history.push({ pathname: routes.LOGIN, state: { target: history.location } });
  }

  function handleLogout(e) {
    logout();
    jwt.removeAll();
    showErrorToast('Boli ste odhlásený');
  }
}

export default withStyles(styles)(Header);
