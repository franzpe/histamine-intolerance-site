import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';

import Routes from './core/routes';
import Footer from './core/Footer';
import Trend from './core/Trend';
import history from './_utils/history';
import routes from './_constants/routesConstants';
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
    flex: 1,
    padding: `${theme.spacing.unit * 4}px 0`
  },
  toast: {
    borderRadius: '5px !important',
    fontFamily: 'Roboto !important',
    fontSize: '14px !important',
    fontWeight: 600,
    letterSpacing: '0.5px',
    boxShadow: '1px 0 10px rgba(0,0,0,0.55) !important'
  }
});

@withStyles(styles)
export default class App extends Component {
  render() {
    const { classes } = this.props;
    const { pathname } = history.location;

    return (
      <div className={classes.app}>
        <Header />
        <ToastContainer toastClassName={classes.toast} />
        {(pathname === routes.RECIPES || pathname === '/') && <Trend />}
        <div className={classes.content}>
          <Routes />
        </div>
        <Footer />
      </div>
    );
  }
}
