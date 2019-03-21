import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import FoodsTable from './FoodsTable';
import { stableSort, getSorting } from '_utils/sort';

export const FOODS_QUERY = gql`
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

const Foods = props => {
  const foodsQuery = useQuery(FOODS_QUERY);
  const [after, setAfter] = useState(1);
  const [orderState, setOrderState] = useState({
    order: 'asc',
    orderBy: 'name'
  });

  useEffect(() => {
    const listener = () => {
      const winHeight = window.outerHeight || window.innerHeight;
      if (window.scrollY > document.body.offsetHeight - winHeight - 300) {
        setAfter(after + 1);
      } else if (after > Math.ceil(foodsQuery.data.foods / 20) + 2) {
        document.removeEventListener('scroll', listener, false);
      }
    };
    document.addEventListener('scroll', listener, false);

    return () => {
      document.removeEventListener('scroll', listener, false);
    };
  });

  return (
    <FoodsTable
      isRatingAllowed={true}
      foods={stableSort(
        foodsQuery.data.foods,
        getSorting(orderState.order, orderState.orderBy)
      ).slice(0, 20 * after)}
      foodsQuery={foodsQuery}
      order={orderState}
      onRequestSort={handleSortRequest}
    />
  );

  function handleSortRequest(property, event) {
    const orderBy = property;
    let order = 'desc';

    if (orderState.orderBy === property && orderState.order === 'desc') {
      order = 'asc';
    }

    setOrderState({ order, orderBy });
  }
};

export default Foods;
