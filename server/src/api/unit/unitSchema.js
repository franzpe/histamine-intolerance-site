import * as graphql from 'graphql';

import * as unitController from './unitController';
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } = graphql;

export const UnitType = new GraphQLObjectType({
  name: 'Unit',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  })
});

export const QueryFields = {
  unit: {
    type: UnitType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, { id }) {
      return unitController.getOne(id);
    }
  },
  units: {
    type: new GraphQLList(UnitType),
    resolve() {
      return unitController.getAll();
    }
  }
};
