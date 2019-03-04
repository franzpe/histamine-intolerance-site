import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, TableRow, TableCell, CircularProgress } from '@material-ui/core';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import { AUTHENTICATION_QUERY } from '_queries/client/userQueries';
import Rating from '_components/Rating';
import { showSuccessToast, showErrorToast } from '_utils/toast';
import { RECIPES_QUERY } from 'recipes/RecipesPage';

const styles = theme => ({
  ratingCell: {
    position: 'relative'
  }
});

const RATE_FOOD_MUTATION = gql`
  mutation rateFood($foodId: Int!, $value: Int!) {
    rateFood(id: $foodId, value: $value)
  }
`;

function Food({ food, foodsQuery, myFood, isRatingAllowed, myFoodsQuery, classes }) {
  const isAuthenticated = useQuery(AUTHENTICATION_QUERY).data.isAuthenticated;
  const rateFood = useMutation(RATE_FOOD_MUTATION);
  const [isRatingLoading, setIsRatingLoading] = useState(false);

  return (
    <TableRow>
      <TableCell>{food.name}</TableCell>
      <TableCell>
        {food.histamineLevel.value - 1} - {food.histamineLevel.name}
      </TableCell>
      <TableCell className={classes.ratingCell}>
        {!isRatingLoading ? (
          (food.totalRating || food.totalRating === 0) && (
            <Rating
              value={food.totalRating || 0}
              valueVariant="h6"
              percentageVariant="body2"
              isRatingAllowed={isAuthenticated && isRatingAllowed}
              onRateClick={handleRateClick}
              upRatingButtonUnavailable={!myFoodsQuery.loading && myFood && myFood.myRating === 1}
              downRatingButtonUnavailable={!myFoodsQuery.loading && myFood && myFood.myRating === 0}
            />
          )
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
      },
      refetchQueries: [{ query: RECIPES_QUERY }]
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
