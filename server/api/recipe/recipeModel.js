import db from '../../utils/dbConnection';

// Model attributes:
// id - Int
// name - String
// creatorId - int FK User
// process - String
// rating - Number
class Recipe extends db.Model {
  constructor(args) {
    super(args);
  }

  get tableName() {
    return 'Recipe';
  }
}

export default Recipe;
