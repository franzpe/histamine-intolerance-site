import * as graphql from 'graphql';

import * as fromUser from './user/userSchema';

const { GraphQLObjectType, GraphQLSchema } = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...fromUser.QueryFields
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
