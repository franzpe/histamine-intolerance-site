import bcrypt from 'bcrypt';
import { Facebook } from 'fb';

import User from './userModel';
import UserFoods from './userFoodsModel';
import UserRecipes from './userRecipesModel';
import { signToken } from '../../auth/auth';
import validator from '../../utils/validator';
import config from '../../config/config';

export const getAll = async () => {
  const users = await User.fetchAll();
  return users.toJSON();
};

/**
 *
 * @param {Object {[key]:any} - prop
 */
export const getAllByProp = async prop => {
  const users = await User.where(prop).fetchAll();
  return users.toJSON();
};

export const getOne = async id => {
  const user = await User.where({
    id: id
  }).fetch();

  if (!user) {
    throw new Error('No user with the given username');
  }

  return user.toJSON();
};

export const update = async (args, user) => {
  if (!validator.isEmail(args.email)) {
    throw new Error('Wrong email format');
  }
  const updatedUser = await new User({ ...user, ...args }).save();
  return updatedUser.toJson();
};

export const changePassword = async ({ oldPassword, newPassword }, user) => {
  if (bcrypt.compareSync(oldPassword, user.password)) {
    new User({ ...user, ...{ password: newPassword } }).save();
    return true;
  } else {
    return false;
  }
};

export const post = async userArgs => {
  let user;
  try {
    user = await new User({ ...userArgs, ...{ role: 'USR' } }).save();
  } catch (err) {
    throw new Error('User s takoutou emailovou adresou uz existuje');
  }

  let token;
  if (user) {
    token = signToken(user.id);
  }
  return token;
};

export const deleteOne = async id => {
  await new User({ id }).destroy();

  return id;
};

export const getUserFoods = async userId => {
  const userFoods = await UserFoods.where({ userId }).fetchAll({ withRelated: ['Food'] });

  const foods = userFoods.toJSON().map(userFood => ({
    ...userFood.Food
  }));

  return foods;
};

export const facebookLogin = async code => {
  const fb = new Facebook();

  return new Promise((resolve, reject) => {
    fb.api(
      `/oauth/access_token?client_id=${config.fb.app_id}&client_secret=${
        config.fb.secret
      }&code=${code}&redirect_uri=http://localhost:3000/facebook-callback&scope=email`,
      response => {
        const { access_token } = response;

        fb.api(
          `/me?fields=id,email,first_name,last_name&access_token=${access_token}`,
          async response => {
            const { id } = response;
            const user = await User.where({ userName: id }).fetch();

            if (!user) {
              const { email, first_name, last_name } = response;
              const userArgs = {
                userName: id,
                email: email || `${first_name}${last_name}@facebook.com`,
                firstName: first_name,
                lastName: last_name,
                password: 'ThisIsGonnaBeRandomStuff'
              };

              const token = await post(userArgs);
              resolve(token);
            } else {
              const token = signToken(user.toJSON().id);
              resolve(token);
            }
          }
        );
      }
    );
  });
};

export const getRating = async (model, args) => {
  // When toJSON() is called upon an model collection the result is an object that looks like and array but it isn't. It doesn't have length property but we can call every function as for array. We can get the length of an 'array' by getting a number of object keys
  const obj = (await model.where({ ...args }).fetchAll()).toJSON();
  const totSum = obj.reduce((a, currValue) => a + currValue.rating, 0);
  const totalRating = totSum / Object.keys(obj).length;

  return totalRating;
};

export const rateFood = async (foodId, userId, value) => {
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

  return await getRating(UserFoods, { foodId });
};

export const getUserFoodRating = async (userId, foodId) => {
  const food = (await UserFoods.where({ userId, foodId }).fetch()).toJSON();
  return food.rating;
};

export const rateRecipe = async (recipeId, userId, value) => {
  if (!validator.isRating(value)) {
    throw new Error('Rating value out of bounds');
  }

  let userRecipe = await UserRecipes.where({ userId, recipeId }).fetch();

  if (!userRecipe) {
    userRecipe = await new UserRecipes({ userId, recipeId, rating: value }).save();
  } else {
    userRecipe = await UserRecipes.where({ userId, recipeId }).save(
      { rating: value },
      { method: 'update' }
    );
  }

  return await getRating(UserRecipes, { recipeId });
};
