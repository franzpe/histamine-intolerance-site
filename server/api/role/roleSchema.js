import * as graphql from 'graphql';

import { authenticated } from '../../auth/auth';
import * as roleController from './roleController';
import * as userController from '../user/userController';
import { UserType } from '../user/userSchema';

const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

export const RoleType = new GraphQLObjectType({
  name: 'Role',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args, context, info) {
        return userController.getAllByProp({ role: parent.id });
      }
    }
  })
});

export const QueryFields = {
  roles: {
    type: new GraphQLList(RoleType),
    resolve: authenticated((parent, args, context, info) => {
      return roleController.getAll();
    })
  }
};
