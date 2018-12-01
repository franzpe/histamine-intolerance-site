import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, PORT, JWT } from 'babel-dotenv';

const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: PORT || 3001,
  // 10 days in seconds
  expireTime: process.env.JWT_EXPIRATION_TIME || 24 * 60 * 60 * 10,
  secrets: {
    jwt: JWT || 'venom'
  },
  db: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
  }
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

let envConfig;
// require could error out if
// the file don't exist so lets try this statement
// and fallback to an empty object if it does error out
try {
  envConfig = require('./' + config.env);
  // just making sure the require actually
  // got something back :)
  envConfig = envConfig || {};
} catch (e) {
  envConfig = {};
}

// merge the two config files together
// the envConfig file will overwrite properties
// on the config object
export default {
  ...config,
  ...envConfig.default
};
