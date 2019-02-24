import React, { Fragment } from 'react';
import { withStyles, Toolbar, Typography, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import classNames from 'classnames';
import { ReactComponent as FacebookSvg } from '_assets/facebook_icon.svg';
import ListIcon from '@material-ui/icons/List';
import ReceiptIcon from '@material-ui/icons/Receipt';
import InfoIcon from '@material-ui/icons/Info';

import history from '../_utils/history';
import routes, { profileRoutes } from '../_constants/routesConstants';
import { showErrorToast } from '../_utils/toast';
import jwt from '../_utils/jwt';
import FacebookLoginBtn from '_components/buttons/FacebookLoginBtn';
import { AUTHENTICATION_QUERY } from '_queries/client/userQueries';
import SideNav from '_components/SideNav';

const styles = theme => ({
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    padding: `${theme.spacing.unit * 2}px 0`,
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing.unit + 2}px 0`
    }
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
    fontSize: '48px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '30px'
    }
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
    height: '34.5px',
    width: '34.5px',
    marginRight: theme.spacing.unit,
    cursor: 'pointer',
    verticalAlign: 'middle'
  },
  menuWrapper: {
    paddingRight: theme.spacing.unit * 3,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'inline-block'
    }
  },
  counterWeight: {
    visibility: 'hidden'
  },
  sectionNav: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
});

export const sections = [
  { to: routes.RECIPES, label: 'Recepty', icon: <ReceiptIcon /> },
  { to: routes.FOODS, label: 'Zoznam potravín', icon: <ListIcon /> },
  { to: routes.ABOUT_US, label: 'O nás', icon: <InfoIcon /> }
];

const LOGOUT_MUTATION = gql`
  mutation logout {
    logout @client
  }
`;

function HeaderMenu({ classes, isAuthenticated, onLoginClick, onLogoutClick, counterWeight }) {
  return (
    <Fragment>
      {!isAuthenticated ? (
        <div
          className={classNames(classes.menuWrapper, { [classes.counterWeight]: counterWeight })}
        >
          <FacebookLoginBtn
            render={({ onClick }) => (
              <FacebookSvg
                className={classes.facebook}
                onClick={onClick}
                alt="Prihlasenie cez Facebook"
              />
            )}
          />
          <Button variant="outlined" size="medium" onClick={onLoginClick}>
            Prihlásiť
          </Button>
        </div>
      ) : (
        <div
          className={classNames(classes.menuWrapper, { [classes.counterWeight]: counterWeight })}
        >
          <Button
            variant="outlined"
            size="medium"
            className={classes.profile}
            onClick={() => history.push(routes.PROFILE + profileRoutes.PERSONAL_INFORMATION)}
          >
            Profil
          </Button>
          <Button variant="contained" size="medium" color="primary" onClick={onLogoutClick}>
            Odhlásiť
          </Button>
        </div>
      )}
    </Fragment>
  );
}

function Header({ classes }) {
  const { isAuthenticated } = useQuery(AUTHENTICATION_QUERY).data;
  const logout = useMutation(LOGOUT_MUTATION);

  return (
    <Fragment>
      <Toolbar className={classes.toolbarMain}>
        <SideNav />
        <HeaderMenu classes={classes} counterWeight={true} />
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
        <HeaderMenu
          classes={classes}
          onLoginClick={handleLogin}
          onLogoutClick={handleLogout}
          isAuthenticated={isAuthenticated}
        />
      </Toolbar>
      <Toolbar variant="dense" className={classes.sectionNav}>
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
