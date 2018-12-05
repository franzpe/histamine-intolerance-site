import * as graphql from 'graphql';

import * as fromUser from './user/userSchema';
import * as fromRole from './role/roleSchema';
import * as fromFood from './food/foodSchema';
import * as fromHistamineLevel from './histamineLevel/histamineLevelSchema';

const { GraphQLObjectType, GraphQLSchema } = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...fromUser.QueryFields,
    ...fromRole.QueryFields,
    ...fromFood.QueryFields,
    ...fromHistamineLevel.QueryFields
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...fromUser.MutationFields
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
