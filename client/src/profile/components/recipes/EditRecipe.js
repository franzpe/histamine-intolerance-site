import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { withRouter } from 'react-router-dom';
import { withStyles, TextField } from '@material-ui/core';

const styles = theme => ({});

const RECIPE_QUERY = gql`
  query recipe($id: Int!) {
    recipe(id: $id) {
      id
      name
      process
      foods {
        id
      }
    }
  }
`;

function EditRecipe({
  classes,
  match: {
    params: { id }
  }
}) {
  const recipe = useQuery(RECIPE_QUERY, { variables: { id: Number(id) } }).data.recipe;
  console.log(recipe);
  return (
    <div>
      <div>Recipe - {recipe.name}</div>
      <form>
        Edit recipe
        <TextField label="name" />
        <TextField label="process" />
      </form>
    </div>
  );
}

export default withStyles(styles)(withRouter(EditRecipe));
