// starting point for our server
import config from './server/config/config';
import app from './server/server';
import { Server } from 'http';
import logger from './server/utils/logger';

const server = Server(app);

server.listen(config.port);
logger.log('listening on http://localhost:' + config.port);
