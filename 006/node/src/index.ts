import { CronJob } from 'cron';
import Koa from 'koa';
import detect from './detect';

const app = new Koa();

app.use((ctx) => {
  ctx.body = 'Wallet System Anomaly Detection';
});

app.listen(process.env.PORT);

const job = new CronJob('*/1 * * * *', detect);

job.start();
