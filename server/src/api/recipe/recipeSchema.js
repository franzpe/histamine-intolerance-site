import * as graphql from 'graphql';
import { GraphQLUpload } from 'graphql-upload';

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
      process: { type: GraphQLString },
      ingredients: {
        type: new GraphQLList(IngredientInputType)
      },
      picture: { type: GraphQLUpload }
    },
    resolve: authenticated((parent, args, { user }, info) => {
      return recipeController.add({ ...args, creatorId: user.id });
    })
  },
  deleteRecipe: {
    type: GraphQLInt,
    args: {
      id: { type: GraphQLInt }
    },
    resolve: authenticated((parent, { id }, { user }) => {
      return recipeController.deleteOne(id, user.id);
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
      },
      picture: { type: GraphQLUpload }
    },
    resolve: authenticated((parent, args, { user }) => {
      return recipeController.update(args, user.id);
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
