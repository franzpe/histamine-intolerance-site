import db from '../../utils/dbConnection';
import Picture from '../picture/pictureModel';
import RecipeFoods from './recipeFoodsModel';
import UserRecipes from '../user/userRecipesModel';

import bookshelfInstance from '../../utils/dbConnection';

// Model attributes:
// id - Int
// name - String
// creatorId - int FK User
// rating - Number
// process - String
// description - String
class Recipe extends db.Model {
  idAttribute;

  constructor(args) {
    super(args);
  }

  get tableName() {
    return 'Recipe';
  }

  picture() {
    return this.belongsTo(Picture, 'id', 'pictureId');
  }

  foods() {
    return this.hasMany(RecipeFoods, 'recipeId', 'id');
  }

  async destroy() {
    await bookshelfInstance.transaction(async t => {
      const recipeId = this.get('id');

      if (this.get('pictureId')) {
        await this.picture()
          .where({ id: this.get('pictureId') })
          .destroy({ transacting: t, required: false });
      }

      const foods = await RecipeFoods.where({ recipeId }).fetchAll();
      const foodsCount = Object.keys(foods.toJSON()).length;

      if (foodsCount > 0) {
        await RecipeFoods.where({ recipeId }).destroy();
      }

      const userRecipes = await UserRecipes.where({ recipeId }).fetchAll();
      const userRecipesCount = Object.keys(userRecipes.toJSON()).length;

      if (userRecipesCount > 0) {
        await UserRecipes.where({ recipeId }).destroy();
      }

      await bookshelfInstance.Model.prototype.destroy.apply(this, { transaction: t });
    });
  }
}

export default Recipe;
