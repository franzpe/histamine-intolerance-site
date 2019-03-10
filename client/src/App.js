import React, { Component, Suspense } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

import Routes from './core/routes';
import Footer from './core/Footer';
import 'react-toastify/dist/ReactToastify.css';
import Header from './core/Header';

const styles = theme => ({
  app: {
    width: 'auto',
    height: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    fontFamily: 'Roboto'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: `${theme.spacing.unit}px 0 ${theme.spacing.unit * 3}px 0`,
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 3}px 0`
    }
  },
  fallback: {
    width: '100%',
    height: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.app}>
        <Header />
        <div className={classes.content}>
          <Suspense
            fallback={
              <div className={classes.fallback}>
                <CircularProgress size={56} thickness={3} color="primary" />
              </div>
            }
          >
            <Routes />
          </Suspense>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(App);
