/* retrigger build x26 */

import { Connection } from 'mongoose';

import { MongoMemoryServer } from 'mongodb-memory-server';
import { container } from './inversify.config';
import logger from './library/logger';
import { ApiService } from './services/api';
import { TYPES as GLOBAL_TYPES } from './types';


async function start() {
  logger.info(process.env);

  const mongod = await MongoMemoryServer.create();

  container
    .rebind(GLOBAL_TYPES.MONGODB_URI)
    .toConstantValue(mongod.getUri());

  await container.get<ApiService>(GLOBAL_TYPES.ApiService).start();
}

async function stop() {
  await container.get<ApiService>(GLOBAL_TYPES.ApiService).stop();

  const mongoose = await container.get<Promise<Connection>>(GLOBAL_TYPES.mongoose);

  await mongoose.close();
}

start();

process.on('beforeExit', async () => {
  await stop();
});

process.on('uncaughtException', async (error) => {
  logger.critical(error);
});

process.on('uncaughtExceptionMonitor', async (error) => {
  logger.critical(error);
});

process.on('unhandledRejection', async (error) => {
  logger.critical(error || 'unhandledRejection');
});
