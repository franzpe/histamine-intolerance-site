import React, { Fragment, memo } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { yellow, green } from '@material-ui/core/colors';
import classNames from 'classnames';

const styles = theme => ({
  rating: {
    display: 'inline-block'
  },
  ratingLow: {
    color: theme.palette.secondary.main
  },
  ratingMedium: {
    color: yellow[700]
  },
  ratingHigh: {
    color: green[700]
  }
});

function Rating({ value, classes, valueVariant, percentageVariant }) {
  const ratingClasses = classNames(classes.rating, {
    [classes.ratingLow]: value < 0.49,
    [classes.ratingMedium]: value >= 0.49 && value <= 0.51,
    [classes.ratingHigh]: value > 0.51
  });

  return (
    <Fragment>
      <Typography variant={valueVariant} component="span" className={ratingClasses}>
        {value}
      </Typography>
      <Typography variant={percentageVariant} component="span" className={ratingClasses}>
        %
      </Typography>
    </Fragment>
  );
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  class: PropTypes.string
};

export default withStyles(styles)(memo(Rating));
