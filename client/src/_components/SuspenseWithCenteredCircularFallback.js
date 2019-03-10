import React, { Suspense } from 'react';
import { withStyles, CircularProgress } from '@material-ui/core';

const styles = () => ({
  fallback: {
    width: '100%',
    height: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function SuspenseWithCenteredCircularFallback({ classes, children }) {
  return (
    <Suspense
      fallback={
        <div className={classes.fallback}>
          <CircularProgress size={56} thickness={3} color="primary" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export default withStyles(styles)(SuspenseWithCenteredCircularFallback);
