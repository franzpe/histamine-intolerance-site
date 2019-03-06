import React from 'react';

import EmptyStarIcon from '@material-ui/icons/StarBorderRounded';
import HalfStarIcon from '@material-ui/icons/StarHalfRounded';
import FullStarIcon from '@material-ui/icons/StarRounded';

export default function StarRating({ value }) {
  const stars = [];
  let rest = value || 0;

  for (let i = 0; i < 5; i++) {
    rest = rest - 0.2;
    if (rest < 0) {
      if (rest > -0.19) {
        stars.push(() => <HalfStarIcon style={{ width: '0.8em' }} />);
      } else {
        stars.push(() => <EmptyStarIcon style={{ width: '0.8em' }} />);
      }
    } else {
      stars.push(() => <FullStarIcon style={{ width: '0.8em' }} />);
    }
  }

  return stars.map((Star, index) => <Star key={index} />);
}
