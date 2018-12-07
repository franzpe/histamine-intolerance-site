import * as graphql from 'graphql';

import { authenticated } from '../../auth/auth';
import { HistamineLevelType } from '../histamineLevel/histamineLevelSchema';
import { UnitType } from '../unit/unitSchema';
import * as histamineLevelController from '../histamineLevel/histamineLevelController';
import * as foodController from './foodController';

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLNonNull
} = graphql;

const FoodTypeFields = {
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
};

export const FoodType = new GraphQLObjectType({
  name: 'Food',
  fields: () => ({ ...FoodTypeFields })
});

export const FoodExtendedType = new GraphQLObjectType({
  name: 'FoodExtended',
  fields: () => ({
    ...FoodTypeFields,
    quantity: { type: new GraphQLNonNull(GraphQLFloat) },
    unit: { type: new GraphQLNonNull(UnitType) }
  })
});

export const QueryFields = {
  food: {
    type: FoodType,
    args: { id: { type: GraphQLInt } },
    resolve(parent, { id }) {
      return foodController.getOne(id);
    }
  },
  foods: {
    type: new GraphQLList(FoodType),
    resolve() {
      return foodController.getAll();
    }
  }
};

export const MutationFields = {
  addFood: {
    type: FoodType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      histamineLevel: { type: GraphQLInt },
      description: { type: GraphQLString }
    },
    resolve: authenticated((parent, args) => {
      return foodController.add(args);
    })
  }
};
