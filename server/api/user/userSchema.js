import * as graphql from 'graphql';

import { authenticated, verifyUser } from '../../auth/auth';
import * as userController from './userController';

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} = graphql;

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    userName: { type: GraphQLString },
    password: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    contactEmail: { type: GraphQLString }
  })
});

export const QueryFields = {
  me: {
    type: UserType,
    resolve: authenticated((parent, args, { user }, info) => {
      return user;
    })
  },
  user: {
    type: UserType,
    args: { id: { type: GraphQLInt } },
    resolve: authenticated((parent, { id }) => {
      return userController.getOne(id);
    })
  },
  users: {
    type: new GraphQLList(UserType),
    resolve: authenticated((parent, args) => {
      return userController.getAll();
    })
  }
};

export const MutationFields = {
  signup: {
    type: GraphQLString,
    args: {
      userName: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args) {
      return userController.post(args);
    }
  },
  login: {
    type: GraphQLString,
    args: {
      userName: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args) {
      return verifyUser(args);
    }
  },
  changePassword: {
    type: GraphQLBoolean,
    args: {
      oldPassword: { type: new GraphQLNonNull(GraphQLString) },
      newPassword: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: authenticated((parent, args, { user }) => {
      return userController.changePassword(args, user);
    })
  },
  updateUser: {
    type: UserType,
    args: {
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      contactEmail: { type: GraphQLString }
    },
    resolve: authenticated((parent, args, { user }) => {
      return userController.update(args, user);
    })
  },
  deleteUser: {
    type: GraphQLInt,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: authenticated((parent, { id }) => {
      return userController.deleteOne(id);
    })
  }
};
