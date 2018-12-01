import User from './userModel';
import { signToken } from '../../auth/auth';

export const params = function(req, res, next, id) {
  User.where({
    id: id
  })
    .fetch()
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        next(new Error(`User with id: ${id} not found`));
      }
    })
    .catch(err => {
      next(err);
    });
};

export const get = function(req, res, next) {
  User.fetchAll()
    .then(x => {
      res.json(x);
    })
    .catch(err => {
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  const user = req.user;
  res.json(user);
};

export const put = function(req, res, next) {
  let user = req.user.toJSON();
  const update = req.body;

  Object.assign(user, update);

  // SAVE CAUSING BLUEBIRD WARNING
  new User(user)
    .save()
    .then(user => {
      return res.json(user.toJson());
    })
    .catch(err => next(err));
};

// Creates user in DB and sends token back
export const post = function(req, res, next) {
  const newUser = req.body;

  new User(newUser)
    .save()
    .then(user => {
      const token = signToken(user.id);

      res.json({
        token: token
      });
    })
    .catch(err => {
      next(err);
    });
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
