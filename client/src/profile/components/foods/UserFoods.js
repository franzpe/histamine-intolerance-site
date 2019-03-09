import React, { Fragment, useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { Button, withStyles, Tooltip } from '@material-ui/core';
import GoodMoodIcon from '@material-ui/icons/Mood';
import BadMoodIcon from '@material-ui/icons/MoodBad';

import Foods from 'foods/FoodsTable';

const styles = theme => ({
  btnContainer: {
    textAlign: 'right',
    marginBottom: theme.spacing.unit / 2,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  foodsContainer: {
    overflow: 'auto'
  },
  btnIcon: {
    marginRight: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      marginRight: 0
    }
  },
  btnText: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
});

const USER_FOODS_QUERY = gql`
  {
    me {
      foods {
        id
        name
        histamineLevel {
          value
          name
        }
        totalRating
        description
        myRating
      }
    }
  }
`;

function UserFoods({ classes }) {
  const userFoods = useQuery(USER_FOODS_QUERY).data.me.foods;
  const [ratingFilter, setRatingFilter] = useState(1);

  return (
    <Fragment>
      <div className={classes.btnContainer}>
        <Tooltip title="Vhodné potraviny" enterDelay={500} leaveDelay={200}>
          <Button
            variant={ratingFilter ? 'contained' : 'text'}
            color="primary"
            size="small"
            style={{ marginRight: '8px' }}
            onClick={() => setRatingFilter(1)}
          >
            <GoodMoodIcon className={classes.btnIcon} fontSize="small" />
            <span className={classes.btnText}>Vhodné</span>
          </Button>
        </Tooltip>
        <Tooltip title="Nevhodné potraviny" enterDelay={500} leaveDelay={200}>
          <Button
            variant={!ratingFilter ? 'contained' : 'text'}
            color="secondary"
            size="small"
            onClick={() => setRatingFilter(0)}
          >
            <BadMoodIcon className={classes.btnIcon} fontSize="small" />
            <span className={classes.btnText}>Nevhodné</span>
          </Button>
        </Tooltip>
      </div>
      <div className={classes.foodsContainer}>
        <Foods isRatingAllowed={false} foods={userFoods.filter(f => f.myRating === ratingFilter)} />
      </div>
    </Fragment>
  );
}

export default withStyles(styles)(UserFoods);
