import express from 'express';
import graphqlHTTP from 'express-graphql';
import { graphqlUploadExpress } from 'graphql-upload';

import logger from './utils/logger';
import appMiddleware from './middleware/appMiddleware';
import schema from './api/rootSchema';
import * as auth from './auth/auth';
import config from './config/config';

const app = express();
// setup the app middlware
appMiddleware(app);

app.use(
  '/graphql',
  auth.checkUser,
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHTTP(req => ({
    schema,
    graphiql: process.env.NODE_ENV === config.dev,
    context: {
      user: req.user
    }
  }))
);

// set up global error handling
app.use(function(err, req, res, next) {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }

  logger.error(err.stack);
  res.status(500).send('Oops');
});

// export the app for testing
export default app;
