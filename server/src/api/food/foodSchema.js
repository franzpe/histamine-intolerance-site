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
  totalRating: {
    type: GraphQLFloat,
    resolve(parent) {
      return foodController.getTotalFoodRating(parent.id);
    }
  },
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
    unit: { type: new GraphQLNonNull(UnitType) },
    myRating: {
      type: GraphQLFloat,
      resolve: (parent, args, { user }) => {
        return user ? foodController.getUserFoodRating(user.id, parent.id) : null;
      }
    }
  })
});

export const UserFoodType = new GraphQLObjectType({
  name: 'UserFoodType',
  fields: () => ({
    ...FoodTypeFields,
    myRating: {
      type: GraphQLFloat,
      resolve: authenticated((parent, args, { user }) => {
        return foodController.getUserFoodRating(user.id, parent.id);
      })
    }
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
  },
  deleteFood: {
    type: GraphQLInt,
    args: {
      id: { type: GraphQLInt }
    },
    resolve: authenticated((parent, { id }) => {
      return foodController.deleteOne(id);
    })
  },
  updateFood: {
    type: FoodType,
    args: {
      id: { type: GraphQLInt },
      name: { type: GraphQLString },
      histamineLevel: { type: GraphQLInt },
      description: { type: GraphQLString }
    },
    resolve: authenticated((parent, args) => {
      return foodController.update(args);
    })
  },
  rateFood: {
    type: GraphQLFloat,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      value: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: authenticated((parent, { id, value }, { user }) => {
      return foodController.rate(id, user.id, value);
    })
  }
};
