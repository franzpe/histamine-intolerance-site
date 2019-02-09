import db from '../../utils/dbConnection';

// Model attributes:
// value - Int
// name - String
// description - String
class HistamineLevel extends db.Model {
  constructor(args) {
    super(args);
  }

  get tableName() {
    return 'HistamineLevel';
  }
}

export default HistamineLevel;
