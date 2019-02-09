import * as graphql from 'graphql';

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql;
import * as histamineLevelController from './histamineLevelController';

export const HistamineLevelType = new GraphQLObjectType({
  name: 'HistamineLevel',
  fields: () => ({
    value: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

export const QueryFields = {
  histamineLevels: {
    type: new GraphQLList(HistamineLevelType),
    resolve() {
      return histamineLevelController.getAll();
    }
  }
};
