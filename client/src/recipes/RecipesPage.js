import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import { AUTHENTICATION_QUERY } from '_queries/client/userQueries';
import RecipeCard from './RecipeCard';

export const RECIPES_QUERY = gql`
  {
    recipes {
      id
      name
      description
      foods {
        myRating
      }
      totalRating
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
  }
});

const RecipesPage = ({ classes }) => {
  const recipes = useQuery(RECIPES_QUERY).data.recipes;
  const isAuthenticated = useQuery(AUTHENTICATION_QUERY).data.isAuthenticated;

  return (
    <Grid container={true} spacing={40} className={classes.grid}>
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} isAuthenticated={isAuthenticated} />
      ))}
    </Grid>
  );
};

export default withStyles(styles)(RecipesPage);
