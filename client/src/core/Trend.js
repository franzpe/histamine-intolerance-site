import React from 'react';
import { Paper, Grid, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  trend: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white
  },
  trendContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0
    }
  }
});

function Trend({ classes }) {
  return (
    <Paper className={classes.trend}>
      <Grid container={true}>
        <Grid item={true} md={6}>
          <div className={classes.trendContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom={true}>
              Title of the trending post
            </Typography>
            <Typography variant="h5" paragraph={true} color="inherit">
              Content of the trending post.Content of the trending post.Content of the trending
              post.Content of the trending post. Content of the trending post.Content of the
              trending post.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default withStyles(styles)(Trend);
