import * as graphql from 'graphql';

import { HistamineLevelType } from '../histamineLevel/histamineLevelSchema';
import * as histamineLevelController from '../histamineLevel/histamineLevelController';
import * as foodController from './foodController';

import { authenticated } from '../../auth/auth';

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLFloat } = graphql;

export const FoodType = new GraphQLObjectType({
  name: 'Food',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    histamineLevel: {
      type: HistamineLevelType,
      resolve(parent) {
        return parent.histamineLevel && histamineLevelController.getOne(parent.histamineLevel);
      }
    },
    rating: { type: GraphQLFloat },
    description: { type: GraphQLString }
  })
});

export const QueryFields = {
  food: {
    type: FoodType,
    args: { id: { type: GraphQLInt } },
    resolve: authenticated((parent, { id }) => {
      return foodController.getOne(id);
    })
  },
  foods: {
    type: new GraphQLList(FoodType),
    resolve: authenticated(() => {
      return foodController.getAll();
    })
  }
};
