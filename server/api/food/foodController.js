import Food from './foodModel';

export const getOne = async value => {
  const food = await Food.where({
    value
  }).fetch();

  if (!food) {
    throw new Error('No food with the given id');
  }

  return food.toJSON();
};

export const getAll = async () => {
  const foods = await Food.fetchAll();
  return foods.toJSON();
};

export const add = async foodProps => {
  const food = await new Food(foodProps).save();
  return food.toJSON();
};
