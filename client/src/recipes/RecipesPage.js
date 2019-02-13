import React, { Fragment, useState } from 'react';
import { withStyles, Grid } from '@material-ui/core';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import { AUTHENTICATION_QUERY } from '_queries/client/userQueries';
import RecipeCard from './RecipeCard';
import PaginationActions from '_components/PaginationActions';

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
    },
    flex: 1
  },
  paginationActions: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit
  }
});

const RecipesPage = ({ classes }) => {
  const recipes = useQuery(RECIPES_QUERY).data.recipes;
  const isAuthenticated = useQuery(AUTHENTICATION_QUERY).data.isAuthenticated;
  const [page, setPage] = useState(0);

  return (
    <Fragment>
      <Grid container={true} spacing={40} className={classes.grid}>
        {recipes.slice(page * 12, page * 12 + 12).map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} isAuthenticated={isAuthenticated} />
        ))}
      </Grid>
      <div className={classes.paginationActions}>
        <PaginationActions
          page={page}
          rowsPerPage={12}
          onChangePage={handleChangePage}
          count={recipes.length}
        />
      </div>
    </Fragment>
  );

  function handleChangePage(e, page) {
    setPage(page);
  }
};

export default withStyles(styles)(RecipesPage);
