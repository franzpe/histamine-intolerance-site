import React from 'react';
import {
  withStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia
} from '@material-ui/core';
import history from '../_utils/history';
import routes from '../_constants/routesConstants';
import { recipeThumbnail } from './recipeThumbnail';

const styles = theme => ({
  grid: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    padding: `${theme.spacing.unit * 8}px 0 `
  }
});

const recipes = [
  { heading: 'Heading', content: 'Post content Post content. Post content.' },
  { heading: 'Heading', content: 'Post content Post content. Post content.' },
  { heading: 'Heading', content: 'Post content Post content. Post content.' },
  { heading: 'Heading', content: 'Post content Post content. Post content.' },
  { heading: 'Heading', content: 'Post content Post content. Post content.' },
  { heading: 'Heading', content: 'Post content Post content. Post content.' },
  { heading: 'Heading', content: 'Post content Post content. Post content.' },
  { heading: 'Heading', content: 'Post content Post content. Post content.' },
  { heading: 'Heading', content: 'Post content Post content. Post content.' },
  { heading: 'Heading', content: 'Post content Post content. Post content.' },
  { heading: 'Heading', content: 'Post content Post content. Post content.' }
];

const RecipesPage = ({ classes }) => {
  return (
    <Grid container={true} spacing={40} className={classes.grid}>
      {recipes.map((recipe, index) => (
        <Grid key={index} item={true} sm={6} md={4} lg={3}>
          <Card className={classes.card}>
            <CardMedia className={classes.cardMedia} image={recipeThumbnail} title="Image title" />
            <CardContent>
              <Typography gutterBottom={true} variant="h5" component="h2">
                {recipe.heading}
              </Typography>
              <Typography>{recipe.content}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                comolr="primary"
                onClick={e => history.push(routes.RECIPES + '/' + index)}
              >
                View
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default withStyles(styles)(RecipesPage);
