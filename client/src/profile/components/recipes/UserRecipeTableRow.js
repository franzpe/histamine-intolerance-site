import React from 'react';
import { withStyles, TableRow, TableCell } from '@material-ui/core';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

import Rating from '_components/Rating';
import { showSuccessToast } from '_utils/toast';
import history from '_utils/history';
import Action from '_components/Action';

const styles = theme => ({
  iconRightMargin: {
    marginRight: theme.spacing.unit / 4
  },
  actionsTableCell: {
    minWidth: '140px',
    position: 'relative'
  },
  actions: {
    position: 'absolute',
    left: theme.spacing.unit * 1.5,
    top: 0
  }
});

const REMOVE_RECIPE_MUTATION = gql`
  mutation deleteRecipe($id: Int!) {
    deleteRecipe(id: $id)
  }
`;

function UserRecipeTableRow({ classes, recipe, recipesQuery }) {
  const removeRecipe = useMutation(REMOVE_RECIPE_MUTATION, { variables: { id: recipe.id } });

  return (
    <TableRow>
      <TableCell>{recipe.name}</TableCell>
      <TableCell>
        <Rating value={recipe.rating} valueVariant="h6" percentageVariant="body2" />
      </TableCell>
      <TableCell className={classes.actionsTableCell}>
        <div className={classes.actions}>
          <Action aria-label="Edit" className={classes.iconRightMargin} onClick={handleEdit}>
            <EditIcon fontSize="small" />
          </Action>
          <Action aria-label="Delete" onClick={handleDelete}>
            <DeleteIcon fontSize="small" />
          </Action>
        </div>
      </TableCell>
    </TableRow>
  );

  function handleEdit(e) {
    history.push('/recipes/edit/' + recipe.id);
  }

  function handleDelete(e) {
    removeRecipe()
      .then(() => {
        showSuccessToast('Recipe has been removed');
        recipesQuery.refetch();
      })
      .catch(err => console.log(err));
  }
}

UserRecipeTableRow.propTypes = {
  recipe: PropTypes.object.isRequired,
  recipesQuery: PropTypes.object.isRequired
};

export default withStyles(styles)(UserRecipeTableRow);
