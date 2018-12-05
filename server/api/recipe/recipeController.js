import Recipe from './recipeModel';
import RecipeFoods from './recipeFoodsModel';

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
