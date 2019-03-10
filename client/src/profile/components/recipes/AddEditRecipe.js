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
import classNames from 'classnames';

import { FOODS_QUERY } from 'foods/Foods';
import SaveBtn from '_components/buttons/SaveBtn';
import SelectField from '_components/SelectField';
import Rating from '_components/Rating';
import history from '_utils/history';
import routes, { profileRoutes } from '_constants/routesConstants';
import Action from '_components/Action';
import { showErrorToast, showSuccessToast } from '_utils/toast';
import { USER_RECIPES_QUERY } from './UserRecipesTable';
import DropzoneField from '_components/DropzoneField';
import BackBtn from '_components/buttons/BackBtn';
import { RECIPES_QUERY } from 'recipes/RecipesPage';

const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg';
const acceptedFileTypesArray = acceptedFileTypes.split(',').map(item => item.trim());

export const RECIPE_QUERY = gql`
  query recipe($id: Int!) {
    recipe(id: $id) {
      id
      name
      process
      myRating
      totalRating
      foods {
        id
        name
        quantity
        myRating
        totalRating
        unit {
          id
        }
      }
      picture {
        url
      }
      description
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
  mutation addRecipe(
    $name: String!
    $process: String!
    $ingredients: [Ingredients]!
    $picture: Upload
    $description: String!
  ) {
    addRecipe(
      name: $name
      process: $process
      ingredients: $ingredients
      picture: $picture
      description: $description
    ) {
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
    $picture: Upload
    $description: String!
  ) {
    updateRecipe(
      id: $id
      name: $name
      process: $process
      ingredients: $ingredients
      picture: $picture
      description: $description
    ) {
      name
    }
  }
`;

export const recipeFormActions = {
  SET_FIELD: 'SET_FIELD',
  SET_INGREDIENT: 'SET_INGREDIENT',
  ADD_INGREDIENT: 'ADD_INGREDIENT',
  DELETE_INGREDIENT: 'DELETE_INGREDIENT',
  VALIDATE: 'VALIDATE'
};

function useRecipeForm(initialFormState) {
  const [state, dispatch] = useReducer(reducer, initialFormState);

  function reducer(state, action) {
    switch (action.type) {
      case recipeFormActions.SET_FIELD: {
        return withValidationErrors(action.payload.field, {
          ...state,
          [action.payload.field]: action.payload.value
        });
      }
      case recipeFormActions.ADD_INGREDIENT: {
        const ingredients = state.ingredients.slice();
        ingredients[ingredients.length - 1] = {
          id: action.payload.food.id,
          quantity: 10,
          unit: 'kg'
        };

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
      case recipeFormActions.VALIDATE: {
        return {
          ...state,
          errors: action.payload.errors
        };
      }
      default:
        return state;
    }
  }

  function withValidationErrors(field, nextState) {
    const errors = validateField(field, nextState);
    return { ...nextState, errors, isValid: Object.keys(errors).length === 0 };
  }

  function validateField(field, state) {
    delete state.errors[field];
    let errors = state.errors;

    if (field === 'description') {
      const descriptionError =
        state.description.length > 50 && 'Presiahli ste maximálny počet znakov 50';
      if (descriptionError) {
        errors = { ...errors, description: descriptionError };
      }
    }

    if (field === 'name') {
      const nameError = !state.name && 'Zadajte názov receptu';
      if (nameError) {
        errors = { ...errors, name: nameError };
      }
    }

    if (field === 'process') {
      const processError = !state.process && 'Popíšte postup receptu';
      if (processError) {
        errors = { ...errors, process: processError };
      }
    }

    return errors;
  }

  // Validates all fields in form and returns true/false whether form is valid. Also dispatch validate action to change error state to hydrate textfields with proper error
  function validate() {
    let errors = {};

    ['description', 'name', 'process'].forEach(field => {
      const fieldError = validateField(field, state)[field];
      if (fieldError) {
        errors = { ...errors, [field]: fieldError };
      }
    });

    dispatch({
      type: recipeFormActions.VALIDATE,
      payload: { errors }
    });

    return Object.keys(errors).length === 0;
  }

  return [state, dispatch, validate];
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
  cardMediaWrapper: {
    position: 'relative',
    height: 'fit-content'
  },
  cardMedia: {
    minHeight: '280px',
    padding: `${theme.spacing.unit * 8}px 0 `
  },
  foods: {
    width: '100%',
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px 0 ${theme.spacing.unit *
      2}px`,
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0 ${theme.spacing.unit *
        2}px`
    }
  },
  food: {
    marginBottom: '8px',
    width: '100%',
    alignItems: 'flex-end',
    height: '35px'
  },
  addFoodWrapper: {
    textAlign: 'center',
    borderRadius: '5px',
    background: 'rgba(0,0,0,0.025)',
    marginBottom: '8px'
  },
  foodPadding: {
    '&:nth-child(even)': {
      paddingLeft: theme.spacing.unit
    },
    '&:nth-child(odd)': {
      paddingRight: theme.spacing.unit
    },
    [theme.breakpoints.down('sm')]: {
      '&:nth-child(even)': {
        paddingLeft: 0
      },
      '&:nth-child(odd)': {
        paddingRight: 0
      }
    }
  },
  btnWrapper: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
    textAlign: 'center'
  },
  back: {
    marginRight: theme.spacing.unit
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
  foodItem: {},
  dropzone: {
    backgroundColor: 'rgba(255,255,255,0.70)',
    width: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    minHeight: '280px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,

    '&:hover': {
      visibility: 'visible'
    }
  },
  dropzoneEmpty: {
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.25)'
  },
  dropzonePicked: {
    opacity: 0,
    '&:hover': {
      opacity: 1
    }
  },
  row: {
    marginBottom: theme.spacing.unit * 3
  }
});

function getIgredients(foods) {
  const ingredients = [];
  if (foods) {
    foods.forEach(food =>
      ingredients.push({ id: food.id, quantity: food.quantity, unit: food.unit.id })
    );
  }

  return ingredients;
}

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

  const [form, dispatch, validate] = useRecipeForm({
    name: recipe ? recipe.name : '',
    process: recipe ? recipe.process : '',
    ingredients: [...getIgredients(recipe && recipe.foods), { id: 0, quantity: 0, unit: '' }],
    picture: null,
    description: recipe ? recipe.description : '',
    isSaving: false,
    isValid: false,
    errors: {}
  });

  const foods = useQuery(FOODS_QUERY).data.foods;
  const units = useQuery(UNITS_QUERY).data.units;

  const addRecipe = useMutation(ADD_RECIPE_MUTATION, {
    variables: {
      name: form.name,
      process: form.process,
      ingredients: form.ingredients.filter(i => i.id !== 0),
      picture: form.picture,
      description: form.description
    },
    refetchQueries: [{ query: USER_RECIPES_QUERY }, { query: RECIPES_QUERY }]
  });

  if (!isNew) {
    updateRecipe = useMutation(UPDATE_RECIPE_MUTATION, {
      variables: {
        id: recipe.id,
        name: form.name,
        process: form.process,
        ingredients: form.ingredients.filter(i => i.id !== 0),
        picture: form.picture,
        description: form.description
      },
      refetchQueries: [
        { query: USER_RECIPES_QUERY },
        { query: RECIPE_QUERY, variables: { id: recipe.id } },
        { query: RECIPES_QUERY }
      ]
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
              error={!!form.errors.name}
              helperText={form.errors && form.errors.name}
              className={classes.recipeName}
              inputProps={{ className: classes.recipeNameInput }}
            />
            {!isNew && (
              <div className={classes.rating}>
                <Rating
                  value={recipe.rating || 0}
                  valueVariant="h4"
                  percentageVariant="h6"
                  valueClassName={classes.ratingValue}
                  percentageClassName={classes.ratingPercentage}
                />
              </div>
            )}
          </div>
          <div className={classes.cardMediaWrapper}>
            {(form.picture || (recipe && recipe.picture)) && (
              <CardMedia
                className={classes.cardMedia}
                image={(form.picture && form.picture.preview) || recipe.picture.url}
                title="Image title"
                style={{ opacity: 1 }}
              />
            )}
            <DropzoneField
              onDrop={handleDrop}
              accept={acceptedFileTypes}
              multiple={false}
              containerProps={{
                className: classNames(classes.dropzone, {
                  [classes.dropzoneEmpty]: !(form.picture || (recipe && recipe.picture)),
                  [classes.dropzonePicked]: form.picture || (recipe && recipe.picture)
                })
              }}
            />
          </div>
          <div className={classes.foods}>
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
                      sm={12}
                      md={form.ingredients.length > 1 ? 6 : 12}
                      className={classes.addFoodWrapper}
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
                      xs={12}
                      sm={12}
                      md={6}
                      className={classNames(classes.food, classes.foodPadding)}
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
                              payload: { index, field: 'quantity', value: Number(e.target.value) }
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
                                payload: { index, field: 'unit', value: option.value }
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
          </div>
          <CardContent style={{ width: '100%' }}>
            <div className={classes.row}>
              <Typography variant="h6" component="span">
                Popis:
              </Typography>
              <TextField
                name="description"
                multiline={true}
                rowsMax={50}
                placeholder="Sem napíš krátky popis o recepte (max 50 znakov)"
                InputLabelProps={{
                  shrink: true
                }}
                fullWidth={true}
                value={form.description}
                error={!!form.errors.description}
                helperText={form.errors && form.errors.description}
                onChange={e =>
                  dispatch({
                    type: recipeFormActions.SET_FIELD,
                    payload: { field: e.target.name, value: e.target.value }
                  })
                }
              />
            </div>
            <Typography variant="h6" component="span">
              Postup:
            </Typography>
            <TextField
              name="process"
              placeholder="Sem napíš postup receptu"
              multiline={true}
              rows={5}
              rowsMax={50}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth={true}
              value={form.process}
              error={!!form.errors.process}
              helperText={form.errors && form.errors.process}
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
        <BackBtn onClick={handleBack} className={classes.back}>
          späť
        </BackBtn>
        <SaveBtn disabled={form.isSaving} onClick={handleSubmit} />
      </div>
    </Fragment>
  );

  function checkForDupliciteIngredients() {
    const duplicates = form.ingredients
      .map(i => i.id)
      .reduce((acc, el, i, arr) => {
        if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el);
        return acc;
      }, []);

    return duplicates.length > 0;
  }

  function handleAddIngredient() {
    dispatch({
      type: recipeFormActions.ADD_INGREDIENT,
      payload: { food: foods[0] }
    });
  }

  function handleSubmit(e) {
    if (!validate()) {
      return;
    }

    if (checkForDupliciteIngredients()) {
      showErrorToast('Recept nemôže obsahovať duplicitné ingrediencie');
      return;
    }

    dispatch({ type: recipeFormActions.SET_FIELD, payload: { field: 'isSaving', value: true } });

    if (isNew) {
      addRecipe()
        .then(res => {
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
          showErrorToast('Recept nebol uložený. Skúste ešte raz');
          dispatch({
            type: recipeFormActions.SET_FIELD,
            payload: { field: 'isSaving', value: false }
          });
        });
    }
  }

  function verifyFile(file) {
    let result = true;
    const currentFileType = file.type;

    if (!(acceptedFileTypesArray.indexOf(currentFileType) > -1)) {
      result = false;
    }

    return result;
  }

  function handleDrop(acceptedFiles, rejectedFiles, e) {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (verifyFile(file)) {
        file.preview = URL.createObjectURL(file);
        dispatch({
          type: recipeFormActions.SET_FIELD,
          payload: {
            field: 'picture',
            value: file
          }
        });
      }
    }
  }

  function handleBack(e) {
    history.push(routes.PROFILE + profileRoutes.RECIPES);
  }
}

export default withStyles(styles)(withRouter(AddEditRecipe));
