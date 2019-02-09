require('dotenv').config();

const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3001,
  // 10 days in seconds
  expireTime: process.env.JWT_EXPIRATION_TIME || 24 * 60 * 60 * 10,
  secrets: {
    jwt: process.env.JWT || 'venom'
  },
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
  fb: {
    app_id: process.env.FACEBOOK_APP_ID,
    secret: process.env.FACEBOOK_SECRET
  },
  showDbQueries: process.env.SHOW_DB_QUERIES === 'true'
};

console.log(config);

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
