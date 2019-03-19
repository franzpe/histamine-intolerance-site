import React, { memo } from 'react';
import { withStyles, Table, TableBody } from '@material-ui/core';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

import FoodRow from './FoodRow';
import EnhancedTableHead from '../_components/tables/EnhancedTableHead';

const styles = theme => ({});

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
    numeric: false,
    label: 'Úroveň histamínu',
    styles: () => ({ column: { minWidth: '210px' } })
  },
  {
    id: 'totalRating',
    numeric: false,
    label: 'Znášanlivosť (% ľudí)',
    styles: () => ({ column: { minWidth: '150px' } })
  },
  {
    id: 'description',
    numeric: false,
    label: 'Poznámky',
    styles: () => ({ column: { minWidth: '210px' } })
  }
];

function FoodsTable({
  foods,
  foodsQuery,
  isRatingAllowed,
  order: { orderBy, order },
  onRequestSort
}) {
  const userFoodsQuery = useQuery(USER_FOODS_QUERY);

  return (
    <Table>
      <EnhancedTableHead
        columns={columns}
        orderBy={orderBy}
        order={order}
        onRequestSort={onRequestSort}
      />
      <TableBody>
        {foods.map((food, index) => (
          <FoodRow
            food={food}
            key={index}
            foodsQuery={foodsQuery}
            myFoodsQuery={userFoodsQuery}
            isRatingAllowed={isRatingAllowed}
            myFood={
              userFoodsQuery.data.me && userFoodsQuery.data.me.foods.find(f => f.id === food.id)
            }
          />
        ))}
      </TableBody>
    </Table>
  );
}

FoodsTable.propTypes = {
  foods: PropTypes.array.isRequired,
  isRatingAllowed: PropTypes.bool.isRequired,
  foodsQuery: PropTypes.object
};

export default withStyles(styles)(memo(FoodsTable));
