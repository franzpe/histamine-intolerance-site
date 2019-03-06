import React from 'react';
import {
  withStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Tooltip
} from '@material-ui/core';
import classNames from 'classnames';

import history from '../_utils/history';
import routes from '../_constants/routesConstants';
import { recipeThumbnail } from './recipeThumbnail';
import StarRating from '_components/StarRating';

const styles = theme => ({
  recipeGrid: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  card: {
    height: '320px',
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
  greenBackground: {
    backgroundColor: 'rgb(56,142,60,0.8)'
  },
  yellowBackground: {
    backgroundColor: 'rgb(253,216,53,0.8)'
  },
  redBackground: {
    backgroundColor: 'rgb(245,0,87,0.8)'
  },
  cardFooter: {
    justifyContent: 'space-between'
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
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom={true} variant="h5" component="h6">
            {recipe.name}
          </Typography>
          <Typography gutterBottom={true}>{recipe.description}</Typography>
        </CardContent>
        <CardActions className={classes.cardFooter}>
          <Button
            size="small"
            comolr="primary"
            onClick={() => history.push(routes.RECIPES + '/' + recipe.id)}
          >
            Pozrieť
          </Button>
          <Tooltip
            enterDelay={500}
            leaveDelay={200}
            title={Math.round(recipe.totalRating * 10000) / 100 + '%'}
          >
            <div style={{ float: 'right' }}>
              <StarRating value={recipe.totalRating} />
            </div>
          </Tooltip>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default withStyles(styles)(RecipeCard);
