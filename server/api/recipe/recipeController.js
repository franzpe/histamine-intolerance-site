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

export const add = async recipeArgs => {
  const recipe = (await new Recipe({
    name: recipeArgs.name,
    creatorId: recipeArgs.creatorId,
    process: recipeArgs.process
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
