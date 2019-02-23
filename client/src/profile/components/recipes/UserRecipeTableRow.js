import React from 'react';
import { withStyles, TableRow, TableCell } from '@material-ui/core';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Rating from '_components/Rating';
import history from '_utils/history';
import Action from '_components/Action';
import routes from '_constants/routesConstants';

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

function UserRecipeTableRow({ classes, recipe, onDeleteRecipe }) {
  return (
    <TableRow>
      <TableCell>{recipe.name}</TableCell>
      <TableCell>
        <Rating value={recipe.rating || 0} valueVariant="h6" percentageVariant="body2" />
      </TableCell>
      <TableCell className={classes.actionsTableCell}>
        <div className={classes.actions}>
          <Action aria-label="Edit" className={classes.iconRightMargin} onClick={handleEdit}>
            <EditIcon fontSize="small" />
          </Action>
          <Action aria-label="Delete" onClick={() => onDeleteRecipe(recipe.id)}>
            <DeleteIcon fontSize="small" />
          </Action>
        </div>
      </TableCell>
    </TableRow>
  );

  function handleEdit(e) {
    history.push(routes.EDIT_RECIPE + '/' + recipe.id);
  }
}

UserRecipeTableRow.propTypes = {
  recipe: PropTypes.object.isRequired,
  recipesQuery: PropTypes.object.isRequired
};

export default withStyles(styles)(UserRecipeTableRow);
