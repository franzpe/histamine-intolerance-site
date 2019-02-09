import db from '../../utils/dbConnection';
import Food from '../food/foodModel';

// Model attributes:
// userId - Int (11)
// recipeId - id (11)
// rating - Int (1)
class UserRecipesModel extends db.Model {
  constructor(args) {
    super(args);
  }

  get tableName() {
    return 'UserRecipes';
  }

  Food = () => {
    return this.hasOne(Food, 'id', 'foodId');
  };
}

export default UserRecipesModel;
