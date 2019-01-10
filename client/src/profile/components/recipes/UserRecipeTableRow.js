import React from 'react';
import { withStyles, TableRow, TableCell, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { withRouter } from 'react-router-dom';

import Rating from '_components/Rating';
import { showSuccessToast } from '_utils/toast';
import history from '_utils/history';

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
  },
  action: {
    '&:hover': {
      color: theme.palette.secondary.main
    }
  }
});

const REMOVE_RECIPE_MUTATION = gql`
  mutation deleteRecipe($id: Int!) {
    deleteRecipe(id: $id)
  }
`;

function UserRecipeTableRow({ classes, recipe, recipesQuery, match: { path } }) {
  const removeRecipe = useMutation(REMOVE_RECIPE_MUTATION, { variables: { id: recipe.id } });

  return (
    <TableRow>
      <TableCell>{recipe.name}</TableCell>
      <TableCell>
        <Rating value={recipe.rating} valueVariant="h6" percentageVariant="body2" />
      </TableCell>
      <TableCell className={classes.actionsTableCell}>
        <div className={classes.actions}>
          <IconButton
            aria-label="Edit"
            className={classNames(classes.action, classes.iconRightMargin)}
            onClick={handleEdit}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="Delete" className={classes.action} onClick={handleDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  );

  function handleEdit(e) {
    history.push(path + '/' + recipe.id);
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
  recipesQuery: PropTypes.func.isRequired
};

export default withStyles(styles)(withRouter(UserRecipeTableRow));
