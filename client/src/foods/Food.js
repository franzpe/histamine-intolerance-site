import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, TableRow, TableCell, CircularProgress } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import classNames from 'classnames';
import DownIcon from '@material-ui/icons/ArrowDropDownRounded';
import UpIcon from '@material-ui/icons/ArrowDropUpRounded';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import { AUTHENTICATION_QUERY } from '_queries/client/userQueries';
import Rating from '_components/Rating';
import { showSuccessToast, showErrorToast } from '_utils/toast';

const styles = theme => ({
  ratingCell: {
    position: 'relative'
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

const RATE_FOOD_MUTATION = gql`
  mutation rateFood($foodId: Int!, $value: Int!) {
    rateFood(id: $foodId, value: $value)
  }
`;

function Food({ food, foodsQuery, myFood, myFoodsQuery, classes }) {
  const isAuthenticated = useQuery(AUTHENTICATION_QUERY).data.isAuthenticated;
  const rateFood = useMutation(RATE_FOOD_MUTATION);
  const [isRatingLoading, setIsRatingLoading] = useState(false);

  const ratingButtonClasses = classNames(classes.ratingButton, {
    [classes.ratingButtonVertical]:
      typeof food.totalRating === 'undefined' || food.totalRating === null
  });
  const upRatingButtonClasses = classNames(ratingButtonClasses, classes.upRatingButton, {
    [classes.unavailable]: !myFoodsQuery.loading && myFood && myFood.myRating === 1
  });
  const downRatingButtonClasses = classNames(ratingButtonClasses, classes.downRatingButton, {
    [classes.unavailable]: !myFoodsQuery.loading && myFood && myFood.myRating === 0
  });

  return (
    <TableRow>
      <TableCell>{food.name}</TableCell>
      <TableCell>
        {food.histamineLevel.value - 1} - {food.histamineLevel.name}
      </TableCell>
      <TableCell className={classes.ratingCell}>
        {!isRatingLoading ? (
          <Fragment>
            {isAuthenticated && (
              <UpIcon className={upRatingButtonClasses} onClick={() => handleRateClick(1)} />
            )}
            {(food.totalRating || food.totalRating === 0) && (
              <Rating
                value={Math.round(food.totalRating * 10000) / 100}
                valueVariant="h6"
                percentageVariant="body2"
              />
            )}
            {isAuthenticated && (
              <DownIcon className={downRatingButtonClasses} onClick={() => handleRateClick(0)} />
            )}
          </Fragment>
        ) : (
          <CircularProgress size={24} thickness={6} color="primary" />
        )}
      </TableCell>
      <TableCell>{food.description}</TableCell>
    </TableRow>
  );

  function handleRateClick(value) {
    setIsRatingLoading(true);
    rateFood({
      variables: {
        foodId: food.id,
        value
      }
    }).then(() => {
      Promise.all([foodsQuery.refetch(), myFoodsQuery.refetch()]).then(() => {
        setIsRatingLoading(false);
        if (value !== 0) {
          showSuccessToast(`Ohodnotili ste ${food.name} ako dobre znášané`);
        } else {
          showErrorToast(`Ohodnotili ste ${food.name} ako zle znášané`);
        }
      });
    });
  }
}

Food.propTypes = {
  food: PropTypes.object.isRequired
};

export default withStyles(styles)(Food);
