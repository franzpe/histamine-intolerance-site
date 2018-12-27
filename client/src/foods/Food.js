import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, TableRow, TableCell, Typography, CircularProgress } from '@material-ui/core';
import { yellow, green, grey } from '@material-ui/core/colors';
import classNames from 'classnames';
import DownIcon from '@material-ui/icons/ArrowDropDown';
import UpIcon from '@material-ui/icons/ArrowDropUp';
import { useQuery, useMutation } from 'react-apollo-hooks';

import { AUTHENTICATION_QUERY } from '_queries/client/userQueries';
import gql from 'graphql-tag';

const styles = theme => ({
  ratingCell: {
    position: 'relative'
  },
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

const RATE_FOOD_MUTATION = gql`
  mutation rateFood($foodId: Int!, $value: Int!) {
    rateFood(id: $foodId, value: $value)
  }
`;

function Food({ food, foodsQuery, myFood, myFoodsQuery, classes }) {
  const isAuthenticated = useQuery(AUTHENTICATION_QUERY).data.isAuthenticated;
  const rateFood = useMutation(RATE_FOOD_MUTATION);
  const [isRatingLoading, setIsRatingLoading] = useState(false);

  const ratingClasses = classNames(classes.rating, {
    [classes.ratingLow]: food.totalRating < 0.49,
    [classes.ratingMedium]: food.totalRating >= 0.49 && food.totalRating <= 0.51,
    [classes.ratingHigh]: food.totalRating > 0.51
  });
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
              <UpIcon
                className={upRatingButtonClasses}
                onClick={() => {
                  setIsRatingLoading(true);
                  rateFood({
                    variables: {
                      foodId: food.id,
                      value: 1
                    }
                  }).then(() => {
                    Promise.all([foodsQuery.refetch(), myFoodsQuery.refetch()]).then(() =>
                      setIsRatingLoading(false)
                    );
                  });
                }}
              />
            )}
            {(food.totalRating || food.totalRating === 0) && (
              <Fragment>
                <Typography variant="h6" component="span" className={ratingClasses}>
                  {Math.round(food.totalRating * 10000) / 100}
                </Typography>
                <Typography variant="body2" component="span" className={ratingClasses}>
                  %
                </Typography>
              </Fragment>
            )}
            {isAuthenticated && (
              <DownIcon
                className={downRatingButtonClasses}
                onClick={() => {
                  setIsRatingLoading(true);
                  rateFood({
                    variables: {
                      foodId: food.id,
                      value: 0
                    }
                  }).then(() => {
                    Promise.all([foodsQuery.refetch(), myFoodsQuery.refetch()]).then(() =>
                      setIsRatingLoading(false)
                    );
                  });
                }}
              />
            )}
          </Fragment>
        ) : (
          <CircularProgress size={24} thickness={6} color="primary" />
        )}
      </TableCell>
      <TableCell>{food.description}</TableCell>
    </TableRow>
  );
}

Food.propTypes = {
  food: PropTypes.object.isRequired
};

export default withStyles(styles)(Food);
