import * as graphql from 'graphql';

import { RoleType } from '../role/roleSchema';
import { authenticated, verifyUser } from '../../auth/auth';
import * as userController from './userController';
import * as roleController from '../role/roleController';
import { FoodType } from '../food/foodSchema';

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
    email: { type: GraphQLString },
    role: {
      type: RoleType,
      resolve(parent, args) {
        return roleController.getOne(parent.role);
      }
    },
    foods: {
      type: new GraphQLList(FoodType),
      resolve(parent) {
        return userController.getUserFoods(parent.id);
      }
    }
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
      return userController.post({ ...args, email: args.userName });
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
  facebookLogin: {
    type: GraphQLString,
    args: {
      code: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async function(parent, { code }) {
      return await userController.facebookLogin(code);
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
      email: { type: GraphQLString }
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
