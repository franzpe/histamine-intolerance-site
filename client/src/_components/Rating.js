import React, { Fragment, memo } from 'react';
import { withStyles, Typography, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import { yellow, green, grey } from '@material-ui/core/colors';
import classNames from 'classnames';
import DownIcon from '@material-ui/icons/ArrowDropDownRounded';
import UpIcon from '@material-ui/icons/ArrowDropUpRounded';

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
  },
  ratingButton: {
    position: 'absolute',
    cursor: 'pointer'
  },
  upRatingButton: {
    left: '0px',
    top: '12px'
  },
  downRatingButton: {
    top: '10px'
  },
  ratingButtonVertical: {
    position: 'unset',
    display: 'block'
  },
  unavailable: {
    visibility: 'hidden',
    color: grey[500]
  }
});

function Rating({
  value,
  classes,
  valueVariant,
  percentageVariant,
  valueClassName,
  percentageClassName,
  isRatingAllowed,
  upButtonClass,
  downButtonClass,
  upRatingButtonUnavailable,
  downRatingButtonUnavailable,
  showTooltips,
  onRateClick
}) {
  let upRatingButtonClasses, downRatingButtonClasses;

  if (isRatingAllowed) {
    const ratingButtonClasses = classNames(classes.ratingButton, {
      [classes.ratingButtonVertical]: typeof value === 'undefined' || value === null
    });
    upRatingButtonClasses = classNames(ratingButtonClasses, classes.upRatingButton, upButtonClass, {
      [classes.unavailable]: upRatingButtonUnavailable
    });
    downRatingButtonClasses = classNames(
      ratingButtonClasses,
      classes.downRatingButton,
      downButtonClass,
      {
        [classes.unavailable]: downRatingButtonUnavailable
      }
    );
  }

  const ratingClasses = classNames(classes.rating, {
    [classes.ratingLow]: value < 0.49,
    [classes.ratingMedium]: value >= 0.49 && value <= 0.51,
    [classes.ratingHigh]: value > 0.51
  });

  return (
    <Fragment>
      {isRatingAllowed && (
        <Tooltip
          enterDelay={500}
          leaveDelay={200}
          title="Ohodnoť kladne"
          disableHoverListener={!showTooltips}
        >
          <UpIcon className={upRatingButtonClasses} onClick={() => onRateClick(1)} />
        </Tooltip>
      )}
      <Typography
        variant={valueVariant}
        component="span"
        className={classNames(ratingClasses, valueClassName)}
      >
        {Math.round(value * 10000) / 100}
      </Typography>
      <Typography
        variant={percentageVariant}
        component="span"
        className={classNames(ratingClasses, percentageClassName)}
      >
        %
      </Typography>
      {isRatingAllowed && (
        <Tooltip
          enterDelay={500}
          leaveDelay={200}
          title="Ohodnoť záporne"
          disableHoverListener={!showTooltips}
        >
          <DownIcon className={downRatingButtonClasses} onClick={() => onRateClick(0)} />
        </Tooltip>
      )}
    </Fragment>
  );
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  class: PropTypes.string,
  isRatingAllowed: PropTypes.bool,
  showTooltips: PropTypes.bool,
  upRatingButtonAvailable: PropTypes.bool,
  downRatingButtonAvailable: PropTypes.bool,
  onRateClick: PropTypes.func
};

export default withStyles(styles)(memo(Rating));
