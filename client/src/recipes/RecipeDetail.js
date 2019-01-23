import React, { memo, Fragment } from 'react';
import { useQuery } from 'react-apollo-hooks';
import {
  withStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia
} from '@material-ui/core';

import { recipeThumbnail } from './recipeThumbnail';
import history from '../_utils/history';
import Rating from '_components/Rating';
import { RECIPE_QUERY } from 'profile/components/recipes/AddEditRecipe';

const styles = theme => ({
  header: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing.unit * 2}px`
    }
  },
  cardMedia: {
    minHeight: '280px',
    padding: `${theme.spacing.unit * 8}px 0 `
  },
  foods: {
    padding: `0 ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px`
  },
  backWrapper: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
    textAlign: 'center'
  },
  back: {
    padding: `0 ${theme.spacing.unit * 5}px`
  },
  foodList: {},
  foodItem: {}
});

/*
0-49 secondary color
49.01 - 50.99 yellow 700
51 - 100 - grenn[500 -> more percentage]
*/
function RecipeDetail({ classes, match }) {
  const {
    error,
    data: { recipe }
  } = useQuery(RECIPE_QUERY, {
    variables: { id: Number(match.params.id) }
  });
  if (error) {
    return null;
  }

  return (
    <Fragment>
      <Card>
        <div className={classes.header}>
          <Typography variant="h4" component="div">
            {recipe.name}
          </Typography>
          <div>
            <Rating value={0.6} valueVariant="h4" percentageVariant="h6" />
          </div>
        </div>
        <Grid container={true}>
          <Grid item={true} xs={12} sm={6}>
            <CardMedia className={classes.cardMedia} image={recipeThumbnail} title="Image title" />
          </Grid>
          <Grid item={true} md={6} className={classes.foods}>
            <Typography variant="subtitle1" component="span" style={{ fontWeight: 500 }}>
              Ingredients:
            </Typography>
            <ul className={classes.foodList}>
              {recipe.foods.map((food, index) => (
                <li key={index} className={classes.foodItem}>
                  <Typography component="span" variant="body2">
                    {food.name}
                  </Typography>
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
        <CardContent>
          <Typography variant="h6" component="span">
            Process:
          </Typography>
          <Typography gutterBottom={true} variant="body2" component="div" align="justify">
            {recipe.process}
          </Typography>
        </CardContent>
      </Card>
      <div className={classes.backWrapper}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => history.push('/')}
          className={classes.back}
        >
          back
        </Button>
      </div>
    </Fragment>
  );
}

export default withStyles(styles)(memo(RecipeDetail));
