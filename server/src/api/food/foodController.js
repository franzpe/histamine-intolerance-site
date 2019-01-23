import Food from './foodModel';
import validator from '../../utils/validator';
import UserFoods from '../user/userFoodsModel';

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

export const rate = async (foodId, userId, value) => {
  if (!validator.isRating(value)) {
    throw new Error('Rating value out of bounds');
  }

  let userFood = await UserFoods.where({ userId, foodId }).fetch();

  if (!userFood) {
    userFood = await new UserFoods({ userId, foodId, rating: value }).save();
  } else {
    userFood = await UserFoods.where({ userId, foodId }).save(
      { rating: value },
      { method: 'update' }
    );
  }

  // When toJSON() is called upon an model collection the result is an object that looks like and array but it isn't. It doesn't have length property but we can call every function as for array. We can get the length of an 'array' by getting a number of object keys
  const foods = (await UserFoods.where({ foodId }).fetchAll()).toJSON();
  const totSum = foods.reduce((a, currValue) => a + currValue.rating, 0);
  const totalRating = totSum / Object.keys(foods).length;

  return totalRating;
};

export const getTotalFoodRating = async foodId => {
  const foods = (await UserFoods.where({ foodId }).fetchAll()).toJSON();
  const totSum = foods.reduce((a, currValue) => a + currValue.rating, 0);
  const totalRating = totSum / Object.keys(foods).length;

  return totalRating;
};

export const getUserFoodRating = async (userId, foodId) => {
  const food = (await UserFoods.where({ userId, foodId }).fetch()).toJSON();
  return food.rating;
};
