import db from '../../utils/dbConnection';

// Model attributes:
// id - Int
// name - String
class Unit extends db.Model {
  constructor(args) {
    super(args);
  }

  get tableName() {
    return 'Unit';
  }
}

export default Unit;
