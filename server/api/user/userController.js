import bcrypt from 'bcrypt';
import { Facebook } from 'fb';

import User from './userModel';
import UserFoods from './userFoodsModel';
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
  if (!validator.isEmail(args.contactEmail)) {
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
  const user = new User({ ...userArgs, ...{ role: 'USR' } }).save();
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

export const getUserFoods = async id => {
  const userFoods = await UserFoods.fetchAll({ withRelated: ['Food'] });

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
      }&code=${code}&redirect_uri=http://localhost:3000/facebook-callback`,
      response => {
        const { access_token } = response;

        fb.api(`/me?fields=id&access_token=${access_token}`, async response => {
          const { id } = response;
          const user = await User.where({ userName: id }).fetch();

          if (!user) {
            const token = await post({ userName: id, password: 'WhateverForNow' });
            resolve(token);
          } else {
            const token = signToken(user.toJSON().id);
            resolve(token);
          }
        });
      }
    );
  });
};
