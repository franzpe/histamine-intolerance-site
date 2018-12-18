import React, { memo, Fragment } from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import {
  withStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia
} from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';

import { recipeThumbnail } from './recipeThumbnail';
import history from '../_utils/history';

const styles = theme => ({
  header: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing.unit * 2}px`
    }
  },
  rating: {
    color: yellow[700],
    display: 'inline-block'
  },
  cardMedia: {
    minHeight: '280px',
    padding: `${theme.spacing.unit * 8}px 0 `
  },
  foods: {
    padding: `0 ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px`
  },
  backWrapper: {
    width: '100%',
    textAlign: 'center'
  },
  back: {
    marginTop: `${theme.spacing.unit * 3}px`,
    padding: `0 ${theme.spacing.unit * 5}px`
  },
  foodList: {},
  foodItem: {}
});

const RECIPE_QUERY = gql`
  query recipe($id: Int!) {
    recipe(id: $id) {
      name
      process
      rating
      foods {
        name
      }
    }
  }
`;

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
      <Card className={classes.card}>
        <div className={classes.header}>
          <Typography variant="h4" component="div">
            {recipe.name}
          </Typography>
          <div>
            <Typography variant="h4" component="span" className={classes.rating}>
              50
            </Typography>
            <Typography variant="h6" component="span" className={classes.rating}>
              %
            </Typography>
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
