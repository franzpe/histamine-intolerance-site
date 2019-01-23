import db from '../../utils/dbConnection';

// Model attributes:
// id - Int
// filename - String
// mimetype - String
// path - String
class Picture extends db.Model {
  constructor(args) {
    super(args);
  }

  get tableName() {
    return 'Picture';
  }
}

export default Picture;
