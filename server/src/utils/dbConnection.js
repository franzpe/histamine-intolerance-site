import knex from 'knex';
import bookshelf from 'bookshelf';

import config from '../config/config';
import cascadeDelete from 'bookshelf-cascade-delete';

const knexInstance = knex({
  client: 'mysql',
  connection: {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    charset: 'utf8'
  }
});

const bookshelfInstance = bookshelf(knexInstance);
bookshelfInstance.plugin(cascadeDelete);

export default bookshelfInstance;
