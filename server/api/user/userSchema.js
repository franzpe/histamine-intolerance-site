import * as graphql from 'graphql';

import { authenticated, verifyUser } from '../../auth/auth';
import * as userController from './userController';

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } = graphql;

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
    async resolve(parent, args) {
      return userController.post(args);
    }
  },
  login: {
    type: GraphQLString,
    args: {
      userName: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parent, args) {
      return verifyUser(args);
    }
  }
};
