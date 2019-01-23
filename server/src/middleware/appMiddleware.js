import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import override from 'method-override';
import helmet from 'helmet';
import compression from 'compression';

import path from 'path';

// setup global middleware here
export default function(app) {
  app.set('json spaces', 2);
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(override());
  app.use(helmet());
  app.use(compression());
  app.use(express.static(path.join(__dirname, '../../client/build')));
}
