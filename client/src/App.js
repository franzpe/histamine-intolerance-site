import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Routes from './core/routes';

const styles = theme => ({
  app: {
    fontFamily: 'Roboto'
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.app}>
        <Routes />
      </div>
    );
  }
}

export default withStyles(styles)(App);
