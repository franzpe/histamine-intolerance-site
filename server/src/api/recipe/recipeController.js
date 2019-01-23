import fs from 'fs';
import Recipe from './recipeModel';
import RecipeFoods from './recipeFoodsModel';
import Picture from '../picture/pictureModel';
import { processFileUpload } from '../../utils/fileUpload';

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
    pictureId: processedPicture && processedPicture.id
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
  const storedRecipe = (await new Recipe({ id: recipeArgs.id }).fetch()).toJSON();

  if (storedRecipe.creatorId !== userId) {
    throw new Error('You can not update others recipe');
  }

  let picture = null;
  if (recipeArgs.picture) {
    if (storedRecipe.pictureId) {
      picture = (await uploadNewPicture(recipeArgs.picture, storedRecipe.pictureId)).toJSON();
    } else {
      picture = (await uploadNewPicture(recipeArgs.picture)).toJSON();
    }
  }

  const recipe = (await new Recipe({
    id: recipeArgs.id,
    name: recipeArgs.name,
    process: recipeArgs.process,
    pictureId: picture && picture.id
  }).save()).toJSON();

  const promises = [];
  recipeArgs.ingredients.forEach(food => {
    new RecipeFoods({
      quantity: food.quantity,
      unit: food.unit
    })
      .where({ recipeId: recipe.id, foodId: food.id })
      .save(null, { method: 'update' });
  });
  await Promise.all(promises);

  return recipe;
};

export const rate = async (id, value) => {
  if (!validator.isRating(value)) {
    throw new Error('Rating value out of bounds');
  }

  const recipe = (await new Recipe({ id }).fetch()).toJSON();
  recipe.rating = recipe.rating + value;
  const updatedRecipe = await new Recipe(recipe).save();
  return updatedRecipe.toJSON();
};

export const deleteOne = async (id, userId) => {
  const recipe = await new Recipe({ id }).fetch();

  if (recipe.toJSON().creatorId !== userId) {
    throw new Error('You can not delete others recipe');
  }

  await recipe.destroy();
  return id;
};
