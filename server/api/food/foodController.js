import Food from './foodModel';
import validator from '../../utils/validator';

export const getOne = async id => {
  const food = await Food.where({
    id
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

export const update = async foodProps => {
  const food = await new Food(foodProps).save();
  return food.toJSON();
};

export const deleteOne = async id => {
  await new Food({ id }).destroy();
  return id;
};

export const rate = async (id, value) => {
  if (!validator.isRating(value)) {
    throw new Error('Rating value out of bounds');
  }
  const food = (await new Food({ id }).fetch()).toJSON();
  food.rating = food.rating + value;
  const updatedFood = await new Food(food).save();
  return updatedFood.toJSON();
};
