import knex from 'knex';
import bookshelf from 'bookshelf';

import config from '../config/config';

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

if (config.showDbQueries) {
  knexInstance.on('query', function(queryData) {
    console.log(queryData.sql);
  });

  knexInstance.on('delete', function(queryData) {
    console.log(queryData);
  });
}

const bookshelfInstance = bookshelf(knexInstance);

export default bookshelfInstance;
