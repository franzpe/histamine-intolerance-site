import React from 'react';
import {
  withStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia
} from '@material-ui/core';
import classNames from 'classnames';

import history from '../_utils/history';
import routes from '../_constants/routesConstants';
import { recipeThumbnail } from './recipeThumbnail';
import Rating from '_components/Rating';

const styles = theme => ({
  recipeGrid: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  card: {
    height: '100%',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column'
  },
  cardContent: {
    flex: 1
  },
  cardMedia: {
    height: '160px',
    position: 'relative',
    padding: `${theme.spacing.unit * 8}px 0 `,
    cursor: 'pointer'
  },
  ratingContainer: {
    display: 'inline-block',
    position: 'absolute',
    right: '0px',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderBottomLeftRadius: '25px',
    padding: '0 4px 2px 10px'
  },
  greenBackground: {
    backgroundColor: 'rgb(56,142,60,0.8)'
  },
  yellowBackground: {
    backgroundColor: 'rgb(253,216,53,0.8)'
  },
  redBackground: {
    backgroundColor: 'rgb(245,0,87,0.8)'
  }
});

const getSuitabilityLabel = count => {
  let label = '';

  if (count === 1) {
    label = `${count} nevyhovujúca zložka`;
  } else if (count === 2 || count === 3 || count === 4) {
    label = `${count} nevyhovujúce zložky`;
  } else {
    label = `${count} nevyhovujúcich zložiek`;
  }

  return label;
};

function RecipeCard({ classes, recipe, isAuthenticated }) {
  const unsuitableIngredientsCount = recipe.foods.filter(f => f.myRating === 0).length;

  return (
    <Grid key={recipe.id} item={true} sm={6} md={4} lg={3} className={classes.recipeGrid}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={recipe.picture ? recipe.picture.url : recipeThumbnail}
          title="Image title"
          onClick={() => history.push(routes.RECIPES + '/' + recipe.id)}
        >
          {isAuthenticated && (
            <Typography
              variant="body2"
              component="span"
              className={classNames({
                [classes.greenBackground]: unsuitableIngredientsCount < 2,
                [classes.yellowBackground]:
                  unsuitableIngredientsCount >= 2 && unsuitableIngredientsCount <= 3,
                [classes.redBackground]: unsuitableIngredientsCount > 3
              })}
              style={{
                display: 'flex',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 0,
                padding: '1px 0',
                width: '100%',
                fontWeight: 500,
                opacity: 1
              }}
            >
              {getSuitabilityLabel(unsuitableIngredientsCount)}
            </Typography>
          )}
        </CardMedia>
        <div className={classes.ratingContainer}>
          <Rating value={recipe.totalRating} valueVariant="h5" percentageVariant="body1" />
        </div>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom={true} variant="h5" component="h6">
            {recipe.name}
          </Typography>
          <Typography gutterBottom={true}>{recipe.description}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            comolr="primary"
            onClick={() => history.push(routes.RECIPES + '/' + recipe.id)}
          >
            Pozrieť
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default withStyles(styles)(RecipeCard);
