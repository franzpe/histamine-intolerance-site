import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import Routes from './core/routes';
import Header from './core/Header';
import Footer from './core/Footer';
import routes from './_constants/routesConstants';

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
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showComponents:
        props.location.pathname !== routes.LOGIN && props.location.pathname !== routes.REGISTER
    };
  }

  componentDidUpdate = prevProps => {
    const { location } = this.props;
    if (location !== prevProps.location) {
      this.setState({
        showComponents: location.pathname !== routes.LOGIN && location.pathname !== routes.REGISTER
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { showComponents } = this.state;

    return (
      <div className={classes.app}>
        {showComponents && <Header />}
        <div className={classes.content}>
          <Routes />
        </div>
        {showComponents && <Footer />}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(App));
