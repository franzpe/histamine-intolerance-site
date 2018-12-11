import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

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
        <div>Histaminova intolerancia</div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
