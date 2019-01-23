import db from '../../utils/dbConnection';

// Model attributes:
// id - Int
// name - String
// histamineLevel - int FK HistamineLevel
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
