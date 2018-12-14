import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.primary.main
  }
});

const RecipesPage = ({ classes }) => {
  return (
    <div className={classes.wrapper}>
      Recipes whatever <br />
    </div>
  );
};

export default withStyles(styles)(RecipesPage);
