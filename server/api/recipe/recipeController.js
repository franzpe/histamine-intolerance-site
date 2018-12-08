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

export const update = async recipeArgs => {
  const recipe = (await new Recipe({
    id: recipeArgs.id,
    name: recipeArgs.name,
    process: recipeArgs.process
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

export const deleteOne = async id => {
  await new Recipe({ id }).destroy();

  return id;
};
