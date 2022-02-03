import 'reflect-metadata';
import Queue from 'p-queue';
import { Container } from 'inversify';
import { TYPES as GLOBAL_TYPES } from '../types';
import { WorkerService } from '.';
import { TYPES } from './types';

const container = new Container();

container.bind<Queue>(TYPES.localQueue).toConstantValue(new Queue({ concurrency: 1, interval: 200, intervalCap: 1 }));
container.bind(TYPES.ETHERSCAN_KEY).toConstantValue('S1W3GXNSMC72X93RF6XD2VPMQVXUUC5KY2');
container.bind<WorkerService>(GLOBAL_TYPES.WorkerService).to(WorkerService).inSingletonScope();
container.bind<number>(TYPES.PORT).toConstantValue(parseInt(process.env.PORT || '8080', 10));
export { container };
