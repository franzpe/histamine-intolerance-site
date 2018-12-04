import db from '../../utils/dbConnection';
import User from '../user/userModel';

// Model attributes:
// id - Int
// name - String
// histamineLevel - int FK HistamineLevel
// rating - Number
// description - String
class Food extends db.Model {
  constructor(args) {
    super(args);
  }

  get tableName() {
    return 'Food';
  }
}

export default Food;
