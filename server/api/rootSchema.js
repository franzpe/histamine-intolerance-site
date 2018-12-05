import * as graphql from 'graphql';

import * as fromUser from './user/userSchema';
import * as fromRole from './role/roleSchema';
import * as fromFood from './food/foodSchema';
import * as fromHistamineLevel from './histamineLevel/histamineLevelSchema';
import * as fromRecipe from './recipe/recipeSchema';
import * as fromUnit from './unit/unitSchema';

const { GraphQLObjectType, GraphQLSchema } = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...fromUser.QueryFields,
    ...fromRole.QueryFields,
    ...fromFood.QueryFields,
    ...fromHistamineLevel.QueryFields,
    ...fromRecipe.QueryFields,
    ...fromUnit.QueryFields
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...fromUser.MutationFields,
    ...fromFood.MutationFields
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
