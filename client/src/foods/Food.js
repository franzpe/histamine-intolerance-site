import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, TableRow, TableCell, Typography } from '@material-ui/core';
import { yellow, green } from '@material-ui/core/colors';
import classNames from 'classnames';
import DownIcon from '@material-ui/icons/ArrowDropDown';
import UpIcon from '@material-ui/icons/ArrowDropUp';
import { useQuery, useMutation } from 'react-apollo-hooks';

import { AUTHENTICATION_QUERY } from '_queries/client/userQueries';
import gql from 'graphql-tag';

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
    cursor: 'pointer'
  },
  ratingButtonVertical: {
    display: 'block'
  }
});

const RATE_FOOD_MUTATION = gql`
  mutation rateFood($foodId: Int!, $value: Int!) {
    rateFood(id: $foodId, value: $value)
  }
`;

function Food({ food, foodsQuery, myFood, myFoodsQuery, classes }) {
  const ratingClasses = classNames(classes.rating, {
    [classes.ratingLow]: food.totalRating < 0.49,
    [classes.ratingMedium]: food.totalRating >= 0.49 && food.totalRating <= 0.51,
    [classes.ratingHigh]: food.totalRating > 0.51
  });
  const ratingButtonClasses = classNames(classes.ratingButton, {
    [classes.ratingButtonVertical]:
      typeof food.totalRating === 'undefined' || food.totalRating === null
  });

  const isAuthenticated = useQuery(AUTHENTICATION_QUERY).data.isAuthenticated;
  const rateFood = useMutation(RATE_FOOD_MUTATION);

  const showUpIcon =
    isAuthenticated &&
    (!(foodsQuery.loading || myFoodsQuery.loading) &&
      (!myFood || (myFood && myFood.myRating !== 1)));

  const showDownIcon =
    isAuthenticated &&
    (!(foodsQuery.loading || myFoodsQuery.loading) &&
      (!myFood || (myFood && myFood.myRating !== 0)));

  return (
    <TableRow>
      <TableCell>{food.name}</TableCell>
      <TableCell>
        {food.histamineLevel.value - 1} - {food.histamineLevel.name}
      </TableCell>
      <TableCell>
        {showUpIcon && (
          <UpIcon
            className={ratingButtonClasses}
            onClick={() =>
              rateFood({
                variables: {
                  foodId: food.id,
                  value: 1
                }
              }).then(() => {
                foodsQuery.refetch();
                myFoodsQuery.refetch();
              })
            }
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
        {showDownIcon && (
          <DownIcon
            className={ratingButtonClasses}
            onClick={() =>
              rateFood({
                variables: {
                  foodId: food.id,
                  value: 0
                }
              }).then(() => {
                foodsQuery.refetch();
                myFoodsQuery.refetch();
              })
            }
          />
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
