import bcrypt from 'bcrypt';

import db from '../../utils/dbConnection';

// Model attributes:
// userName - String
// password - String
class User extends db.Model {
  constructor(args) {
    super(args);

    this.on('saving', this.beforeSave);
  }

  get tableName() {
    return 'User';
  }

  beforeSave = () => {
    if (this.hasChanged('password')) {
      console.log(this.get('password'));
      this.set('password', this.encryptPassword(this.get('password')));
    }
  };

  // Check if passwords match
  authenticate = plainTextPassword => {
    console.log(plainTextPassword);
    console.log(this.get('password'));
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
