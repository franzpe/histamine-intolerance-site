import bcrypt from 'bcryptjs';

import db from '../../utils/dbConnection';
import Role from '../role/roleModel';

// Model attributes:
// id - int
// userName - String
// password - String
// firstName - String
// lastName - String
// email - String
// role - int FK Role
// creationDate - Date
class User extends db.Model {
  constructor(args) {
    super(args);

    this.on('saving', this.beforeSave);
  }

  get tableName() {
    return 'User';
  }

  Role = () => {
    return this.hasOne(Role, 'id', 'role');
  };

  beforeSave = () => {
    if (this.hasChanged('password')) {
      this.set('password', this.encryptPassword(this.get('password')));
    }
  };

  // Check if passwords match
  authenticate = plainTextPassword => {
    return bcrypt.compareSync(plainTextPassword, this.get('password'));
  };

  // Password hashing
  encryptPassword = plainTextPassword => {
    if (!plainTextPassword) {
      return '';
    } else {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPassword, salt);
    }
  };

  // We're not returning password from user object
  toJson = () => {
    const obj = this.toJSON();
    delete obj.password;
    return obj;
  };
}

export default User;
