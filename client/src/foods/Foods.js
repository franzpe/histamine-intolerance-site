import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import FoodsTable from './FoodsTable';

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

  useEffect(() => {
    const listener = () => {
      if (window.scrollY > document.body.offsetHeight - window.outerHeight - 300) {
        setAfter(after + 1);
      } else if (after > Math.ceil(foodsQuery.data.foods / 20) + 2) {
        window.removeEventListener('scroll', listener, false);
      }
    };

    window.addEventListener('scroll', listener, false);

    return () => {
      window.removeEventListener('scroll', listener, false);
    };
  });

  return (
    <FoodsTable
      isRatingAllowed={true}
      foods={foodsQuery.data.foods
        .sort(function(a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
        .slice(0, 20 * after)}
      foodsQuery={foodsQuery}
    />
  );
};

export default Foods;
