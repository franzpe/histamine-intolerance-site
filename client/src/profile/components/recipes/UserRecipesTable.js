import React, { useState } from 'react';
import { Table, TableBody } from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

import EnhancedTableHead from '_components/tables/EnhancedTableHead';
import { stableSort, getSorting } from '_utils/sort';
import UserRecipeTableRow from './UserRecipeTableRow';

const columns = [
  {
    id: 'name',
    numeric: false,
    label: 'Názov',
    styles: () => ({ column: { width: '70%' } })
  },
  {
    id: 'rating',
    numeric: true,
    label: 'Rating'
  },
  {
    id: 'actions',
    numeric: true,
    label: 'Akcie'
  }
];

const USER_RECIPES_QUERY = gql`
  {
    me {
      recipes {
        id
        name
        rating
      }
    }
  }
`;

function UserRecipesTable() {
  const userRecipes = useQuery(USER_RECIPES_QUERY);

  const [orderState, setOrderState] = useState({
    order: 'asc',
    orderBy: 'name'
  });

  return (
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
          <UserRecipeTableRow key={recipe.id} recipe={recipe} recipesQuery={userRecipes} />
        ))}
      </TableBody>
    </Table>
  );

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
