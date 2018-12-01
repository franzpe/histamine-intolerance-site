import express from 'express';

import api from './api/api';
import logger from './utils/logger';
import auth from './auth/routes';
import appMiddleware from './middleware/appMiddleware';

const app = express();
// setup the app middlware
appMiddleware(app);

// setup the api
app.use('/api', api);
app.use('/auth', auth);

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
