import React, { Fragment, useReducer } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { withRouter } from 'react-router-dom';
import {
  withStyles,
  TextField,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { FOODS_QUERY } from 'foods/FoodsPage';
import SaveBtn from '_components/buttons/SaveBtn';
import SelectField from '_components/SelectField';
import Rating from '_components/Rating';
import { recipeThumbnail } from 'recipes/recipeThumbnail';
import history from '_utils/history';
import routes, { profileRoutes } from '_constants/routesConstants';
import Action from '_components/Action';
import { showErrorToast, showSuccessToast } from '_utils/toast';
import { USER_RECIPES_QUERY } from './UserRecipesTable';

const RECIPE_QUERY = gql`
  query recipe($id: Int!) {
    recipe(id: $id) {
      id
      name
      process
      foods {
        id
      }
    }
  }
`;

const UNITS_QUERY = gql`
  {
    units {
      id
      name
    }
  }
`;

const ADD_RECIPE_MUTATION = gql`
  mutation addRecipe($name: String!, $process: String!, $ingredients: [Ingredients]!) {
    addRecipe(name: $name, process: $process, ingredients: $ingredients) {
      name
    }
  }
`;

const UPDATE_RECIPE_MUTATION = gql`
  mutation updateRecipe(
    $id: Int!
    $name: String!
    $process: String!
    $ingredients: [Ingredients]!
  ) {
    updateRecipe(id: $id, name: $name, process: $process, ingredients: $ingredients) {
      name
    }
  }
`;

export const recipeFormActions = {
  SET_FIELD: 'SET_FIELD',
  SET_INGREDIENT: 'SET_INGREDIENT',
  ADD_INGREDIENT: 'ADD_INGREDIENT',
  DELETE_INGREDIENT: 'DELETE_INGREDIENT'
};

function useRecipeForm(initialFormState) {
  const [state, dispatch] = useReducer(reducer, initialFormState);

  function reducer(state, action) {
    switch (action.type) {
      case recipeFormActions.SET_FIELD: {
        return {
          ...state,
          [action.payload.field]: action.payload.value
        };
      }
      case recipeFormActions.ADD_INGREDIENT: {
        const ingredients = state.ingredients.slice();
        ingredients[ingredients.length - 1] = { id: 1, quantity: 10, unit: 'kg' };

        return {
          ...state,
          ingredients: [...ingredients, { id: 0, quantity: 0, unit: '' }]
        };
      }
      case recipeFormActions.SET_INGREDIENT: {
        const ingredients = state.ingredients.slice();
        ingredients[action.payload.index] = {
          ...ingredients[action.payload.index],
          [action.payload.field]: action.payload.value
        };
        return {
          ...state,
          ingredients
        };
      }
      case recipeFormActions.DELETE_INGREDIENT: {
        return {
          ...state,
          ingredients: state.ingredients.filter((_, i) => i !== action.payload.index)
        };
      }
      default:
        return state;
    }
  }

  return [state, dispatch];
}

const styles = theme => ({
  card: {
    position: 'relative'
  },
  header: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
    display: 'flex',
    alignItems: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing.unit * 2}px`
    }
  },
  recipeName: {
    flex: 1,
    margin: `${theme.spacing.unit}px 0`
  },
  rating: {
    marginLeft: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 1.5
  },
  ratingValue: {
    fontSize: '32px'
  },
  ratingPercentage: {
    fontSize: '26px'
  },
  recipeNameInput: {
    fontSize: '32px'
  },
  cardMedia: {
    minHeight: '280px',
    padding: `${theme.spacing.unit * 8}px 0 `
  },
  foods: {
    padding: `0 ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px`
  },
  btnWrapper: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
    textAlign: 'center'
  },
  back: {
    marginRight: theme.spacing.unit,
    padding: `0 ${theme.spacing.unit * 5}px`
  },
  circle: {
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    textAlign: 'center',
    top: '-30px',
    right: '-30px',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.light,
    padding: '8px',
    borderRadius: '50%',
    verticalAlign: 'middle'
  },
  add: {
    minHeight: '32px',
    height: '34px',
    width: '34px'
  },
  rPadding: { paddingRight: theme.spacing.unit },
  lPadding: { paddingLeft: theme.spacing.unit },
  deleteAction: {
    padding: '7px'
  },
  foodList: {},
  foodItem: {}
});

function AddEditRecipe({
  classes,
  match: {
    params: { id }
  },
  isNew
}) {
  let recipe, updateRecipe;
  if (!isNew) {
    recipe = useQuery(RECIPE_QUERY, { variables: { id: Number(id) } }).data.recipe;
  }

  const [form, dispatch] = useRecipeForm({
    name: recipe ? recipe.name : '',
    process: recipe ? recipe.process : '',
    ingredients: [{ id: 0, quantity: 0, unit: '' }],
    isSaving: false
  });

  const foods = useQuery(FOODS_QUERY).data.foods;
  const units = useQuery(UNITS_QUERY).data.units;
  const addRecipe = useMutation(ADD_RECIPE_MUTATION, {
    variables: { name: form.name, process: form.process, ingredients: form.ingredients },
    refetchQueries: [{ query: USER_RECIPES_QUERY }]
  });

  if (!isNew) {
    updateRecipe = useMutation(UPDATE_RECIPE_MUTATION, {
      variables: {
        id: recipe.id,
        name: form.name,
        process: form.process,
        ingredients: form.ingredients
      },
      refetchQueries: [{ query: USER_RECIPES_QUERY }]
    });
  }

  const ingredienceHeaderBottomMargin =
    form.ingredients.filter(i => i.id !== 0).length > 0 ? '4px' : '16px';

  return (
    <Fragment>
      <Card className={classes.card}>
        <form>
          <div className={classes.header}>
            <TextField
              name="name"
              placeholder="Názov"
              value={form.name}
              onChange={e =>
                dispatch({
                  type: recipeFormActions.SET_FIELD,
                  payload: { field: e.target.name, value: e.target.value }
                })
              }
              margin="normal"
              className={classes.recipeName}
              inputProps={{ className: classes.recipeNameInput }}
            />
            {!isNew && (
              <div className={classes.rating}>
                <Rating
                  value={0.6}
                  valueVariant="h4"
                  percentageVariant="h6"
                  valueClassName={classes.ratingValue}
                  percentageClassName={classes.ratingPercentage}
                />
              </div>
            )}
          </div>
          <Grid container={true}>
            <Grid item={true} xs={12} sm={6}>
              <CardMedia
                className={classes.cardMedia}
                image={recipeThumbnail}
                title="Image title"
              />
            </Grid>
            <Grid item={true} xs={12} sm={6} md={6} className={classes.foods}>
              <Typography
                variant="h6"
                component="span"
                style={{
                  lineHeight: '1.25rem',
                  marginBottom: ingredienceHeaderBottomMargin
                }}
              >
                Ingrediencie:
              </Typography>
              <Grid container={true}>
                {form.ingredients.map((ingredient, index) => {
                  if (ingredient.id === 0) {
                    return (
                      <Grid
                        key={index}
                        item={true}
                        xs={12}
                        style={{
                          textAlign: 'center',
                          borderRadius: '5px',
                          padding: '4px 0',
                          background: 'rgba(0,0,0,0.025)'
                        }}
                      >
                        <Button onClick={handleAddIngredient} fullWidth={true}>
                          Pridaj potravinu
                        </Button>
                      </Grid>
                    );
                  } else {
                    return (
                      <Grid
                        key={index}
                        container={true}
                        item={true}
                        sm={12}
                        md={12}
                        style={{ marginBottom: '8px', width: '100%', alignItems: 'flex-end' }}
                      >
                        <Grid item={true} xs={7} sm={7} md={7}>
                          <SelectField
                            placeholder="Vyber potravinu"
                            className={classes.rPadding}
                            value={form.ingredients[index].id}
                            clearRenderer={() => <Fragment />}
                            options={foods.map(food => ({
                              value: food.id,
                              label: food.name,
                              clearableValue: false
                            }))}
                            onChange={option => {
                              if (option) {
                                dispatch({
                                  type: recipeFormActions.SET_INGREDIENT,
                                  payload: {
                                    index,
                                    field: 'id',
                                    value: option ? option.value : ''
                                  }
                                });
                              }
                            }}
                          />
                        </Grid>
                        <Grid item={true} xs={2} sm={2} md={2}>
                          <TextField
                            type="number"
                            placeholder="Množstvo"
                            value={form.ingredients[index].quantity}
                            onChange={e =>
                              dispatch({
                                type: recipeFormActions.SET_INGREDIENT,
                                payload: { index, field: 'quantity', value: e.target.value }
                              })
                            }
                          />
                        </Grid>
                        <Grid item={true} xs={2} sm={2} md={2}>
                          <SelectField
                            isMulti={false}
                            placeholder="jednotka"
                            className={classes.lPadding}
                            cleareable={false}
                            value={form.ingredients[index].unit}
                            options={units.map(unit => ({
                              value: unit.id,
                              label: unit.id,
                              clearableValue: false
                            }))}
                            clearRenderer={() => <Fragment />}
                            onChange={option => {
                              if (option) {
                                dispatch({
                                  type: recipeFormActions.SET_INGREDIENT,
                                  payload: { index, field: 'unit', value: option }
                                });
                              }
                            }}
                          />
                        </Grid>
                        <Grid item={true} container={true} xs={1} sm={1} md={1} justify="center">
                          <Action
                            aria-label="Delete"
                            className={classes.deleteAction}
                            onClick={() =>
                              dispatch({
                                type: recipeFormActions.DELETE_INGREDIENT,
                                payload: { index }
                              })
                            }
                          >
                            <DeleteIcon fontSize="small" />
                          </Action>
                        </Grid>
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </Grid>
          </Grid>
          <CardContent style={{ width: '100%' }}>
            <Typography variant="h6" component="span">
              Postup:
            </Typography>
            <TextField
              name="process"
              multiline={true}
              rows={5}
              rowsMax={50}
              placeholder="Sem napíš postup receptu"
              InputLabelProps={{
                shrink: true
              }}
              fullWidth={true}
              value={form.process}
              onChange={e =>
                dispatch({
                  type: recipeFormActions.SET_FIELD,
                  payload: { field: e.target.name, value: e.target.value }
                })
              }
            />
          </CardContent>
        </form>
      </Card>
      <div className={classes.btnWrapper}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleBack}
          className={classes.back}
        >
          späť
        </Button>
        <SaveBtn disabled={form.isSaving} onClick={handleSubmit} />
      </div>
    </Fragment>
  );

  function handleAddIngredient() {
    dispatch({
      type: recipeFormActions.ADD_INGREDIENT
    });
  }

  function handleSubmit(e) {
    dispatch({ type: recipeFormActions.SET_FIELD, payload: { field: 'isSaving', value: true } });

    if (isNew) {
      addRecipe()
        .then(() => {
          showSuccessToast('Recept bol uložený');
          const timeout = setTimeout(() => {
            history.push(routes.PROFILE + profileRoutes.RECIPES);
            clearTimeout(timeout);
          }, 800);
        })
        .catch(() => {
          showErrorToast('Recept nebol uložený. Skúste ešte raz');
          dispatch({
            type: recipeFormActions.SET_FIELD,
            payload: { field: 'isSaving', value: false }
          });
        });
    } else {
      updateRecipe()
        .then(() => {
          showSuccessToast('Recept bol uložený');
          const timeout = setTimeout(() => {
            history.push(routes.PROFILE + profileRoutes.RECIPES);
            clearTimeout(timeout);
          }, 800);
        })
        .catch(error => {
          console.log(error);
          showErrorToast('Recept nebol uložený. Skúste ešte raz');
          dispatch({
            type: recipeFormActions.SET_FIELD,
            payload: { field: 'isSaving', value: false }
          });
        });
    }
  }

  function handleBack(e) {
    history.push(routes.PROFILE + profileRoutes.RECIPES);
  }
}

export default withStyles(styles)(withRouter(AddEditRecipe));