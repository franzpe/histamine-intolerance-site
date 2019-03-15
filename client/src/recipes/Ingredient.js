import React, { Fragment } from 'react';
import { withStyles, Tooltip } from '@material-ui/core';
import classNames from 'classnames';

import { green } from '@material-ui/core/colors';
import Rating from '_components/Rating';

const styles = theme => ({
  rating: {
    display: 'inline',
    fontWeight: 500
  },
  percentageSize: {
    fontSize: '12px'
  },
  text: {
    fontWeight: 500
  },
  good: {
    color: green[700]
  },
  bad: {
    color: theme.palette.secondary.main
  }
});

function IngredientSuitabilityForUser({ classes, rating }) {
  const suitabilityClass = classNames(classes.text, {
    [classes.good]: rating === 1,
    [classes.bad]: rating === 0
  });
  return (
    <Tooltip title="Podľa vášho indvidiuálneho hodnotenia" enterDelay={500} leaveDelay={200}>
      <span className={suitabilityClass}>{rating === 1 ? ' vhodné' : ' nevhodné'}</span>
    </Tooltip>
  );
}

function IngredientRating({ classes, totalRating }) {
  return (
    <Tooltip
      title="Počet percent vyjadrujúci znášanlivosť potraviny medzi ľudmi"
      enterDelay={500}
      leaveDelay={200}
    >
      <span>
        <Rating
          valueClassName={classes.rating}
          percentageClassName={classNames(classes.rating, classes.percentageSize)}
          value={totalRating || 0}
        />
      </span>
    </Tooltip>
  );
}

function Ingredient({ classes, food, isAuthenticated }) {
  return (
    <Fragment>
      {`${food.name} - ${food.quantity !== 0 ? food.quantity + ' ' + food.unit.id + ' - ' : ''}`}
      {isAuthenticated ? (
        food.myRating !== null ? (
          <IngredientSuitabilityForUser rating={food.myRating} classes={classes} />
        ) : (
          <IngredientRating classes={classes} totalRating={food.totalRating} />
        )
      ) : (
        <IngredientRating classes={classes} totalRating={food.totalRating} />
      )}
    </Fragment>
  );
}

export default withStyles(styles)(Ingredient);
