import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import override from 'method-override';
import helmet from 'helmet';
import compression from 'compression';
import config from '../config/config';

// setup global middleware here
export default function(app) {
  app.use(compression());
  app.set('json spaces', 2);
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(override());
  app.use(helmet());

  if (process.env.NODE_ENV === config.dev) {
    app.use(express.static('client/build'));
  } else {
    app.use(express.static('client'));
  }
}
