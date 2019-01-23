import db from '../../utils/dbConnection';

// Model attributes:
// id - Int
// name - String
class Role extends db.Model {
  constructor(args) {
    super(args);
  }

  get tableName() {
    return 'Role';
  }
  users = () => {
    return this.hasMany(User, 'role', 'id');
  };
}

export default Role;
