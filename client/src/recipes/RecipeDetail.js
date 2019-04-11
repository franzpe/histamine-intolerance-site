import React, { memo, Fragment, useState } from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { withStyles, Grid, Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import gql from 'graphql-tag';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import { Helmet } from 'react-helmet';

import { recipeThumbnail } from './recipeThumbnail';
import history from '../_utils/history';
import Rating from '_components/Rating';
import { RECIPE_QUERY } from 'profile/components/recipes/AddEditRecipe';
import Ingredient from './Ingredient';
import { AUTHENTICATION_QUERY } from '_queries/client/userQueries';
import { showSuccessToast, showErrorToast } from '_utils/toast';
import BackBtn from '_components/buttons/BackBtn';

const RATE_RECIPE_MUTATION = gql`
  mutation rateRecipe($recipeId: Int!, $value: Int!) {
    rateRecipe(id: $recipeId, value: $value)
  }
`;

const styles = theme => ({
  header: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing.unit * 2}px`
    }
  },
  cardMedia: {
    minHeight: '280px',
    padding: `${theme.spacing.unit * 8}px 0 `
  },
  foods: {
    padding: `0 ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px`,
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0 ${theme.spacing.unit *
        2}px`
    }
  },
  backWrapper: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
    textAlign: 'center'
  },
  upRatingButton: {
    top: '6px',
    left: '-26px',
    fontSize: '30px'
  },
  downRatingButton: {
    top: '4px',
    right: '-24px',
    fontSize: '30px'
  },
  shareBtn: {
    display: 'inline-block',
    marginRight: theme.spacing.unit,
    cursor: 'pointer'
  }
});

/*
0-49 secondary color
49.01 - 50.99 yellow 700
51 - 100 - grenn[500 -> more percentage]
*/
function RecipeDetail({ classes, match }) {
  const {
    error,
    data: { recipe },
    refetch
  } = useQuery(RECIPE_QUERY, {
    variables: { id: Number(match.params.id) }
  });

  const [isRating, setIsRating] = useState(false);
  const isAuthenticated = useQuery(AUTHENTICATION_QUERY).data.isAuthenticated;
  const rateRecipe = useMutation(RATE_RECIPE_MUTATION);

  if (error) {
    return null;
  }

  return (
    <Fragment>
      {recipe.picture.url && (
        <Helmet
          meta={[
            { name: 'og:image', content: recipe.picture.url },
            { name: 'og:url', content: window.location.origin + history.location.pathname },
            { name: 'og:description', content: recipe.description }
          ]}
        />
      )}
      <Card>
        <div className={classes.header}>
          <Typography variant="h4" component="div">
            {recipe.name}
          </Typography>
          <div style={{ position: 'relative', ...(!recipe.myRating && { marginRight: '15px' }) }}>
            <Rating
              value={recipe.totalRating || 0}
              valueVariant="h4"
              percentageVariant="h6"
              isRatingAllowed={isAuthenticated}
              upButtonClass={classes.upRatingButton}
              downButtonClass={classes.downRatingButton}
              upRatingButtonUnavailable={!!recipe.myRating || isRating}
              downRatingButtonUnavailable={!!recipe.myRating || isRating}
              showTooltips={true}
              onRateClick={handleRateClick}
            />
          </div>
        </div>
        <Grid container={true}>
          <Grid item={true} xs={12} sm={12} md={6}>
            <CardMedia
              className={classes.cardMedia}
              image={recipe.picture ? recipe.picture.url : recipeThumbnail}
              title="Image title"
            />
          </Grid>
          <Grid item={true} xs={12} sm={12} md={6} className={classes.foods}>
            <Typography variant="subtitle1" component="span" style={{ fontWeight: 500 }}>
              Ingrediencie:
            </Typography>
            <Grid container={true}>
              {recipe.foods.map((food, index) => (
                <Grid key={index} item={true} xs={12} sm={4} md={6}>
                  <Typography component="span" variant="body2">
                    <Ingredient food={food} isAuthenticated={isAuthenticated} />
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <CardContent>
          <Typography variant="h6" component="span">
            Postup:
          </Typography>
          <Typography
            gutterBottom={true}
            variant="body2"
            component="span"
            align="justify"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {recipe.process}
          </Typography>
          <div style={{ marginTop: 20 }}>
            <Typography variant="subtitle1" component="span" style={{ fontWeight: 500 }}>
              Zdieľaj na
            </Typography>
            <FacebookShareButton
              url={window.location.origin + window.location.pathname}
              hashtag={`#${recipe.name.replace(' ', '')}`}
              className={classes.shareBtn}
            >
              <FacebookIcon size={40} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
              url={window.location.origin + window.location.pathname}
              title={recipe.name}
              hashtags={['bezhistaminovo']}
              className={classes.shareBtn}
            >
              <TwitterIcon size={40} round={true} />
            </TwitterShareButton>
          </div>
        </CardContent>
      </Card>
      <div className={classes.backWrapper}>
        <BackBtn onClick={() => history.push('/')}>Späť</BackBtn>
      </div>
    </Fragment>
  );

  function handleRateClick(value) {
    setIsRating(true);
    rateRecipe({
      variables: {
        recipeId: recipe.id,
        value
      }
    })
      .then(() => {
        Promise.all([refetch()]).then(() => {
          setIsRating(false);
          if (value !== 0) {
            showSuccessToast(`Ohodnotili ste ${recipe.name} ako dobre znášané`);
          } else {
            showErrorToast(`Ohodnotili ste ${recipe.name} ako zle znášané`);
          }
        });
      })
      .catch(() => {
        showErrorToast(`Vyskitla sa chyba. Prosím ohodnoďte ešte raz`);
        setIsRating(false);
      });
  }
}

export default withStyles(styles)(memo(RecipeDetail));
