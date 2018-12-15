import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Routes from './core/routes';
import Header from './core/Header';
import Footer from './core/Footer';
import 'react-toastify/dist/ReactToastify.css';

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
    flex: 1
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

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.app}>
        <ToastContainer toastClassName={classes.toast} />
        <Header />
        <div className={classes.content}>
          <Routes />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(App));
