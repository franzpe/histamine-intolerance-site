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

import history from '../_utils/history';
import routes from '../_constants/routesConstants';
import { recipeThumbnail } from './recipeThumbnail';
import Rating from '_components/Rating';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

const RECIPES_QUERY = gql`
  {
    recipes {
      id
      name
      process
      rating
      picture {
        url
      }
    }
  }
`;

const styles = theme => ({
  grid: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
  },
  card: {
    height: '100%',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column'
  },
  recipeGrid: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  cardMedia: {
    padding: `${theme.spacing.unit * 8}px 0 `
  },
  ratingContainer: {
    display: 'inline-block',
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: '5%',
    padding: `0px ${theme.spacing.unit / 2}px`
  }
});

const RecipesPage = ({ classes }) => {
  const recipes = useQuery(RECIPES_QUERY).data.recipes;

  return (
    <Grid container={true} spacing={40} className={classes.grid}>
      {recipes.map((recipe, index) => (
        <Grid key={recipe.id} item={true} sm={6} md={4} lg={3} className={classes.recipeGrid}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={recipe.picture ? recipe.picture.url : recipeThumbnail}
              title="Image title"
            />
            <div className={classes.ratingContainer}>
              <Rating value={recipe.rating} valueVariant="h5" percentageVariant="body1" />
            </div>
            <CardContent>
              <Typography gutterBottom={true} variant="h5" component="h6">
                {recipe.name}
              </Typography>
              <Typography>{recipe.process}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                comolr="primary"
                onClick={() => history.push(routes.RECIPES + '/' + recipe.id)}
              >
                View
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default withStyles(styles)(RecipesPage);
