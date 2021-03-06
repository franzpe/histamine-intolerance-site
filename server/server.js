import express from 'express';
import graphqlHTTP from 'express-graphql';
import { graphqlUploadExpress } from 'graphql-upload';

import logger from './utils/logger';
import appMiddleware from './middleware/appMiddleware';
import schema from './api/rootSchema';
import * as auth from './auth/auth';
import config from './config/config';
import path from 'path';

const app = express();
// setup the app middlware
appMiddleware(app);

app.use('/images', express.static('images'));

app.use(
  '/graphql',
  auth.checkUser,
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHTTP(req => {
    return {
      schema,
      graphiql: process.env.NODE_ENV === config.dev,
      context: {
        req: req,
        url:
          // req.protocol returns http in productiun even if its using https but maybe not proper licence
          (process.env.NODE_ENV === config.prod ? 'https' : 'http') + '://' + req.get('host'),
        user: req.user
      }
    };
  })
);

app.get('*.js', function(req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

// serve all routes
app.use('*', (req, res, next) => {
  const siteurl = process.env.NODE_ENV === config.dev ? '../client/build' : '../client';
  return res.sendFile(path.resolve(__dirname, siteurl, 'index.html'));
});

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
