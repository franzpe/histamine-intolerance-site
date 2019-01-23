// starting point for our server
import config from './src/config/config';
import app from './src/server';
import { Server } from 'http';
import logger from './src/utils/logger';

const server = Server(app);

server.listen(config.port);
logger.log('listening on http://localhost:' + config.port);
