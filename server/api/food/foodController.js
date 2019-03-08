import Food from './foodModel';
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

export const getSome = async (first, after, orderBy, order) => {
  const foods = await Food.query(qb =>
    qb
      .orderBy(orderBy || 'name', order || 'asc')
      .limit(first)
      .offset(after * first)
  ).fetchAll();
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

export const getTotalFoodRating = async foodId => {
  const foods = (await UserFoods.where({ foodId }).fetchAll()).toJSON();
  const totSum = foods.reduce((a, currValue) => a + currValue.rating, 0);
  const totalRating = totSum / Object.keys(foods).length;

  return totalRating;
};
