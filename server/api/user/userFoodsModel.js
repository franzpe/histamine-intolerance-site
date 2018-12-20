import db from '../../utils/dbConnection';
import Food from '../food/foodModel';

// Model attributes:
// userId - Int (11)
// foodId - id (11)
// rating - Int (1)
class UserFoodsModel extends db.Model {
  constructor(args) {
    super(args);
  }

  get tableName() {
    return 'UserFoods';
  }

  Food = () => {
    return this.hasOne(Food, 'id', 'foodId');
  };
}

export default UserFoodsModel;
