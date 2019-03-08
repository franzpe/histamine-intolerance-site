import * as graphql from 'graphql';
import { GraphQLUpload } from 'graphql-upload';

import * as userController from '../user/userController';
import * as recipeController from './recipeController';
import * as pictureController from '../picture/pictureController';
import { UserType } from '../user/userSchema';
import { FoodExtendedType } from '../food/foodSchema';
import { authenticated } from '../../auth/auth';
import { PictureType } from '../picture/pictureSchema';
import { PaginationArgs } from '../common/SchemaTypes';

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
    myRating: {
      type: GraphQLFloat,
      resolve: (parent, args, { user }) => {
        return user ? userController.getUserRecipeRating(user.id, parent.id) : null;
      }
    },
    totalRating: {
      type: GraphQLFloat,
      resolve(parent) {
        return recipeController.getTotalRecipeRating(parent.id);
      }
    },
    foods: {
      type: new GraphQLList(FoodExtendedType),
      resolve(parent) {
        return recipeController.getRecipeFoods(parent.id);
      }
    },
    picture: {
      type: PictureType,
      resolve(parent) {
        return pictureController.getOne(parent.pictureId);
      }
    },
    description: {
      type: GraphQLString
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
  },
  someRecipes: {
    type: new GraphQLList(RecipeType),
    args: PaginationArgs,
    resolve(_, { first, after }) {
      return recipeController.getSome(first, after);
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
      picture: { type: GraphQLUpload },
      description: { type: GraphQLString }
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
      picture: { type: GraphQLUpload },
      description: { type: GraphQLString }
    },
    resolve: authenticated((parent, args, { user }) => {
      return recipeController.update(args, user.id);
    })
  },
  rateRecipe: {
    type: GraphQLFloat,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      value: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: authenticated((parent, { id, value }, { user }) => {
      return userController.rateRecipe(id, user.id, value);
    })
  }
};
