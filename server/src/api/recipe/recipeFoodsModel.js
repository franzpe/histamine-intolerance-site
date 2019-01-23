import db from '../../utils/dbConnection';
import Food from '../food/foodModel';
import Unit from '../unit/unitModel';

// Model attributes:
// userId - Int
// foodId - id
// quantity - float
// unit - string
class RecipeFoodsModel extends db.Model {
  constructor(args) {
    super(args);
  }

  get tableName() {
    return 'RecipeFoods';
  }

  Food = () => {
    return this.hasOne(Food, 'id', 'foodId');
  };

  Unit = () => {
    return this.hasOne(Unit, 'id', 'unit');
  };
}

export default RecipeFoodsModel;
