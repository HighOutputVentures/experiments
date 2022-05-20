import { CronJob } from 'cron';
import detect from './detect';

const job = new CronJob('*/1 * * * *', detect);

job.start();
