import * as graphql from 'graphql';

import * as userController from '../user/userController';
import * as recipeController from './recipeController';
import { UserType } from '../user/userSchema';
import { FoodExtendedType } from '../food/foodSchema';
import { authenticated } from '../../auth/auth';

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLInputObjectType
} = graphql;

const IngredientInputType = new GraphQLInputObjectType({
  name: 'Ingredients',
  fields: {
    id: { type: GraphQLInt },
    quantity: { type: GraphQLFloat },
    unit: { type: GraphQLString }
  }
});

export const RecipeType = new GraphQLObjectType({
  name: 'Recipe',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    creator: {
      type: UserType,
      resolve(parent) {
        return userController.getOne(parent.creatorId);
      }
    },
    process: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    foods: {
      type: new GraphQLList(FoodExtendedType),
      resolve(parent) {
        return recipeController.getRecipeFoods(parent.id);
      }
    }
  })
});

export const QueryFields = {
  recipe: {
    type: RecipeType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parent, { id }) {
      return recipeController.getOne(id);
    }
  },
  recipes: {
    type: new GraphQLList(RecipeType),
    resolve() {
      return recipeController.getAll();
    }
  }
};

export const MutationFields = {
  addRecipe: {
    type: RecipeType,
    args: {
      name: { type: GraphQLString },
      creatorId: { type: GraphQLInt },
      process: { type: GraphQLString },
      ingredients: {
        type: new GraphQLList(IngredientInputType)
      }
    },
    resolve: authenticated((parent, args, context, info) => {
      return recipeController.add(args);
    })
  },
  deleteRecipe: {
    type: GraphQLInt,
    args: {
      id: { type: GraphQLInt }
    },
    resolve: authenticated((parent, { id }) => {
      return recipeController.deleteOne(id);
    })
  },
  updateRecipe: {
    type: RecipeType,
    args: {
      id: { type: GraphQLInt },
      name: { type: GraphQLString },
      process: { type: GraphQLString },
      ingredients: {
        type: new GraphQLList(IngredientInputType)
      }
    },
    resolve: authenticated((parent, args) => {
      return recipeController.update(args);
    })
  },
  rateRecipe: {
    type: RecipeType,
    args: {
      id: { type: GraphQLInt },
      value: { type: GraphQLInt }
    },
    resolve: authenticated((parent, { id, value }) => {
      return recipeController.rate(id, value);
    })
  }
};
