import db from '../../utils/dbConnection';
import Picture from '../picture/pictureModel';
import RecipeFoods from './recipeFoodsModel';

import bookshelfInstance from '../../utils/dbConnection';

// Model attributes:
// id - Int
// name - String
// creatorId - int FK User
// rating - Number
// process - String
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
      if (this.get('pictureId')) {
        await this.picture()
          .where({ id: this.get('pictureId') })
          .destroy({ transacting: t, required: false });
      }

      const foods = await RecipeFoods.where({ recipeId: this.get('id') }).fetchAll();
      const foodsCount = Object.keys(foods.toJSON()).length;

      if (foodsCount > 0) {
        await RecipeFoods.where({ recipeId: this.get('id') }).destroy();
      }

      await bookshelfInstance.Model.prototype.destroy.apply(this, { transaction: t });
    });
  }
}

export default Recipe;
