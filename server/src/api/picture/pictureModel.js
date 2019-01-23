import db from '../../utils/dbConnection';
import Recipe from '../recipe/recipeModel';

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

  recipe() {
    return this.hasOne(Recipe, 'pictureId');
  }
}

export default Picture;
