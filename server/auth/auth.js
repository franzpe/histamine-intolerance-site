import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

import config from '../config/config';
import User from '../api/user/userModel';

const checkToken = expressJwt({
  secret: config.secrets.jwt,
  credentialsRequired: false
});

export const decodeToken = function() {
  return function(req, res, next) {
    // make it optional to place token on query string
    // if it is, place it on the headers where it should be
    // so checkToken can see it. See follow the 'Bearer 034930493' format
    // so checkToken can see it and decode it
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }
    // this will call next if token is valid
    // and send error if its not. It will attach id to req.user
    // the decoded token to req.user
    checkToken(req, res, next);
  };
};

export const getFreshUser = function() {
  return function(req, res, next) {
    if (req.user) {
      User.where({
        id: req.user.id
      })
        .fetch()
        .then(user => {
          if (!user) {
            // Checktocken is assigning to req.user.id from token if found
            req.user = null;
          } else {
            req.user = user.toJSON();
          }
          next();
        })
        .catch(err => {
          next();
        });
    } else {
      next();
    }
  };
};

export const verifyUser = async ({ userName, password }) => {
  // Look up the user in DB to password check
  const user = await User.forge({ userName }).fetch();

  if (!user) {
    throw new Error('Email alebo heslo je nesprávne');
  } else {
    if (!user.authenticate(password)) {
      throw new Error('Wrong password');
    } else {
      return signToken(user.id);
    }
  }
};

// util method to sign tokens on signup
export const signToken = function(id) {
  return jwt.sign(
    {
      id: id
    },
    config.secrets.jwt,
    {
      expiresIn: config.expireTime
    }
  );
};

export const checkUser = [decodeToken(), getFreshUser()];

export const authenticated = resolver => (parent, args, context, info) => {
  if (context.user) {
    return resolver(parent, args, context, info);
  }
  throw new Error('You are not authenticated!');
};
