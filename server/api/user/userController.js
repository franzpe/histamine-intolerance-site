import User from './userModel';
import { signToken } from '../../auth/auth';

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

export const put = function(req, res, next) {
  let user = req.user.toJSON();
  const update = req.body;

  Object.assign(user, update);

  new User(user)
    .save()
    .then(user => {
      return res.json(user.toJson());
    })
    .catch(err => next(err));
};

export const post = async userArgs => {
  const user = new User(userArgs).save();
  let token;
  if (user) {
    token = signToken(user.id);
  }
  return token;
};

export const del = function(req, res, next) {
  const user = req.user;

  new User({ id: user.id })
    .destroy()
    .then(user => {
      if (!user) {
        next(new Error('User not found'));
      } else {
        res.json(user);
      }
    })
    .catch(err => next(err));
};

export const me = function(req, res) {
  res.json(req.user.toJson());
};
