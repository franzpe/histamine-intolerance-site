import User from './userModel';
import { signToken } from '../../auth/auth';
import bcrypt from 'bcrypt';

export const getAll = async () => {
  const users = await User.fetchAll();
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
  const user = await new User({ id }).destroy();

  if (!user) {
    throw new Error('User not found');
  }

  return id;
};

export const me = function(req, res) {
  res.json(req.user.toJson());
};
