import React, { useState, memo } from 'react';
import { withStyles, Table, TableBody } from '@material-ui/core';

import Food from './Food';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import FoodsHead from './FoodsHead';
import { stableSort, getSorting } from '_utils/sort';

const styles = theme => ({});

const FOODS_QUERY = gql`
  {
    foods {
      id
      name
      histamineLevel {
        value
        name
      }
      totalRating
      description
    }
  }
`;

const USER_FOODS_QUERY = gql`
  {
    me {
      foods {
        id
        myRating
      }
    }
  }
`;

const columns = [
  {
    id: 'name',
    numeric: false,
    label: 'Názov',
    styles: () => ({ column: { width: '450px', minWidth: '235px' } })
  },
  {
    id: 'histamineLevel',
    numeric: true,
    label: 'Úroveň histamínu',
    styles: () => ({ column: { minWidth: '210px' } })
  },
  {
    id: 'totalRating',
    numeric: true,
    label: 'Rating',
    styles: () => ({ column: { minWidth: '150px' } })
  },
  {
    id: 'description',
    numeric: false,
    label: 'Poznámky',
    styles: () => ({ column: { minWidth: '210px' } })
  }
];

function Foods() {
  const foodsQuery = useQuery(FOODS_QUERY);
  const userFoodsQuery = useQuery(USER_FOODS_QUERY);
  const [orderState, setOrderState] = useState({
    order: 'asc',
    orderBy: 'name'
  });

  return (
    <Table>
      <FoodsHead
        columns={columns}
        orderBy={orderState.orderBy}
        order={orderState.order}
        onRequestSort={handleSortRequest}
      />
      <TableBody>
        {stableSort(foodsQuery.data.foods, getSorting(orderState.order, orderState.orderBy)).map(
          (food, index) => (
            <Food
              food={food}
              key={index}
              foodsQuery={foodsQuery}
              myFoodsQuery={userFoodsQuery}
              myFood={
                userFoodsQuery.data.me && userFoodsQuery.data.me.foods.find(f => f.id === food.id)
              }
            />
          )
        )}
      </TableBody>
    </Table>
  );

  function handleSortRequest(property, event) {
    const orderBy = property;
    let order = 'desc';

    if (orderState.orderBy === property && orderState.order === 'desc') {
      order = 'asc';
    }

    setOrderState({ order, orderBy });
  }
}

export default withStyles(styles)(memo(Foods));
