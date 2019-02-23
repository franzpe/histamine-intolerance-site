import React, { useState, Fragment } from 'react';
import { Table, TableBody } from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery, useMutation } from 'react-apollo-hooks';

import EnhancedTableHead from '_components/tables/EnhancedTableHead';
import { stableSort, getSorting } from '_utils/sort';
import UserRecipeTableRow from './UserRecipeTableRow';
import ConfirmationDialog from '_components/ConfirmationDialog';
import { showSuccessToast, showErrorToast } from '_utils/toast';

const columns = [
  {
    id: 'name',
    numeric: false,
    label: 'Názov',
    styles: () => ({ column: { width: '70%' } })
  },
  {
    id: 'rating',
    numeric: false,
    label: 'Rating'
  },
  {
    id: 'actions',
    numeric: false,
    label: 'Akcie'
  }
];

export const USER_RECIPES_QUERY = gql`
  query userRecipes {
    me {
      recipes {
        id
        name
        rating
      }
    }
  }
`;

const REMOVE_RECIPE_MUTATION = gql`
  mutation deleteRecipe($id: Int!) {
    deleteRecipe(id: $id)
  }
`;

function UserRecipesTable() {
  const [openDialog, setOpenDialog] = useState(false);
  const [orderState, setOrderState] = useState({
    order: 'asc',
    orderBy: 'name'
  });
  const [selectedRecipeId, setSelectedRecipeId] = useState(0);

  const userRecipes = useQuery(USER_RECIPES_QUERY);
  const removeRecipe = useMutation(REMOVE_RECIPE_MUTATION, {
    variables: { id: selectedRecipeId },
    refetchQueries: [{ query: USER_RECIPES_QUERY }]
  });
  return (
    <Fragment>
      <Table>
        <EnhancedTableHead
          columns={columns}
          orderBy={orderState.orderBy}
          order={orderState.order}
          onRequestSort={handleSortRequest}
        />
        <TableBody>
          {stableSort(
            userRecipes.data.me.recipes,
            getSorting(orderState.order, orderState.orderBy)
          ).map(recipe => (
            <UserRecipeTableRow
              key={recipe.id}
              recipe={recipe}
              recipesQuery={userRecipes}
              onDeleteRecipe={recipeId => {
                setSelectedRecipeId(recipeId);
                setOpenDialog(true);
              }}
            />
          ))}
        </TableBody>
      </Table>
      <ConfirmationDialog
        open={openDialog}
        title="Odstrániť"
        contentText={(() => {
          const recipe = userRecipes.data.me.recipes.find(r => r.id === selectedRecipeId);
          return `Naozaj chcete odstrániť recept - ${recipe && recipe.name}`;
        })()}
        onClose={handleClose}
      />
    </Fragment>
  );

  function handleClose(result, e) {
    setOpenDialog(false);

    if (result) {
      removeRecipe()
        .then(() => {
          showSuccessToast('Recipe has been removed');
        })
        .catch(err => {
          showErrorToast('Recept sa nepodarilo vymazať');
          console.log(err);
        });
    }
  }

  function handleSortRequest(property) {
    const orderBy = property;
    let order = 'desc';

    if (orderState.orderBy === property && orderState.order === 'desc') {
      order = 'asc';
    }

    setOrderState({ order, orderBy });
  }
}

export default UserRecipesTable;
