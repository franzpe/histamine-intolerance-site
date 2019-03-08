import fs from 'fs';
import Recipe from './recipeModel';
import RecipeFoods from './recipeFoodsModel';
import Picture from '../picture/pictureModel';
import { processFileUpload } from '../../utils/fileUpload';
import UserRecipes from '../user/userRecipesModel';
import logger from '../../utils/logger';

export const getOne = async id => {
  const recipe = await Recipe.where({
    id: id
  }).fetch();

  if (!recipe) {
    throw new Error('No recipe with the given id');
  }

  return recipe.toJSON();
};

export const getAll = async () => {
  const recipes = await Recipe.fetchAll();
  return recipes.toJSON();
};

export const getSome = async (first, after) => {
  const recipes = await Recipe.query(qb => qb.limit(first).offset(after * first)).fetchAll();
  return recipes.toJSON();
};

export const getUserRecipes = async userId => {
  const recipes = await Recipe.where({ creatorId: userId }).fetchAll();
  return recipes.toJSON();
};

export const getRecipeFoods = async id => {
  const recipeFoods = await RecipeFoods.where({ recipeId: id }).fetchAll({
    withRelated: ['Food', 'Unit']
  });

  const foods = recipeFoods.toJSON().map(recipeFood => ({
    ...recipeFood.Food,
    quantity: recipeFood.quantity,
    unit: recipeFood.Unit
  }));

  return foods;
};

/**
 * If storedPictureId param is present, that means we have already stored some picture for certain recipe, therefore we need to remove that image before inserting a new one
 * @param {object} picture
 * @param {string} storedPictureId
 */
const uploadNewPicture = async (picture, storedPictureId) => {
  const folderPath = 'images';

  if (storedPictureId) {
    fs.unlinkSync(folderPath + '/' + storedPictureId);
    new Picture({ id: storedPictureId }).destroy();
  }

  const processedPicture = await processFileUpload(picture, folderPath);
  return new Picture(processedPicture).save(null, { method: 'insert' });
};

export const add = async recipeArgs => {
  let processedPicture = null;
  if (recipeArgs.picture) {
    processedPicture = (await uploadNewPicture(recipeArgs.picture)).toJSON();
  }

  const recipe = (await new Recipe({
    name: recipeArgs.name,
    creatorId: recipeArgs.creatorId,
    process: recipeArgs.process,
    pictureId: processedPicture && processedPicture.id,
    description: recipeArgs.description
  }).save()).toJSON();

  const promises = [];
  recipeArgs.ingredients.forEach(food => {
    promises.push(
      new RecipeFoods({
        recipeId: recipe.id,
        foodId: food.id,
        quantity: food.quantity,
        unit: food.unit
      }).save()
    );
  });
  await Promise.all(promises);

  return recipe;
};

export const update = async (recipeArgs, userId) => {
  const storedRecipe = (await new Recipe({ id: recipeArgs.id }).fetch({
    withRelated: ['foods']
  })).toJSON();

  if (storedRecipe.creatorId !== userId) {
    throw new Error('You can not update others recipe');
  }

  // upload and insert picture
  let picture = null;
  if (recipeArgs.picture) {
    if (storedRecipe.pictureId) {
      picture = (await uploadNewPicture(recipeArgs.picture, storedRecipe.pictureId)).toJSON();
    } else {
      picture = (await uploadNewPicture(recipeArgs.picture)).toJSON();
    }
  }

  const updatedRecipe = (await new Recipe({
    id: recipeArgs.id,
    name: recipeArgs.name,
    process: recipeArgs.process,
    pictureId: picture ? picture.id : storedRecipe.pictureId,
    description: recipeArgs.description
  }).save()).toJSON();

  // Remove all entries
  const foods = await RecipeFoods.where({ recipeId: storedRecipe.id }).fetchAll();
  const foodsCount = Object.keys(foods.toJSON()).length;

  if (foodsCount > 0) {
    await RecipeFoods.where({ recipeId: storedRecipe.id }).destroy();
  }

  // Insert new ingredients
  const promises = [];

  recipeArgs.ingredients.forEach(ingredient => {
    new RecipeFoods({
      recipeId: storedRecipe.id,
      foodId: ingredient.id,
      quantity: ingredient.quantity,
      unit: ingredient.unit
    }).save(null, {
      method: 'insert'
    });
  });

  await Promise.all(promises);

  return updatedRecipe;
};

export const deleteOne = async (id, userId) => {
  const recipe = await new Recipe({ id }).fetch();

  if (recipe.toJSON().creatorId !== userId) {
    throw new Error('You can not delete others recipe');
  }

  await recipe.destroy();
  return id;
};

export const getTotalRecipeRating = async recipeId => {
  const recipesDb = await UserRecipes.where({ recipeId }).fetchAll();

  if (!recipesDb) {
    logger.error('getTotalRecipeRating: No recipes found');
    return null;
  }

  const recipes = recipesDb.toJSON();
  const totSum = recipes.reduce((a, currValue) => a + currValue.rating, 0);
  const totalRating = totSum / Object.keys(recipes).length;

  return totalRating;
};
