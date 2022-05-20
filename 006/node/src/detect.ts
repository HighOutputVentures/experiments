import * as tf from '@tensorflow/tfjs-node';
import { DateTime } from 'luxon';
import R from 'ramda';
import elastic from './elastic';
import logger from './logger';
import SlackAPI from './slack-api';

const MIN_VALUE = 0.0;
const MAX_VALUE = 50869.4;
const THRESHOLD = 0.0009913438;

tf.setBackend('cpu');

const queryBody = (gte: string, lte: string) => ({
  size: 0,
  query: {
    bool: {
      must: [
        {
          match: {
            'json.tags': 'client, transaction',
          },
        },
        {
          exists: {
            field: 'json.message.responseTime',
          },
        },
        {
          range: {
            '@timestamp': {
              gte,
              lte,
            },
          },
        },
      ],
    },
  },
  aggs: {
    window: {
      date_histogram: {
        field: '@timestamp',
        fixed_interval: '1s',
      },
      aggs: {
        point: {
          percentiles: {
            field: 'json.message.responseTime',
            percents: [95],
          },
        },
      },
    },
  },
});

export default async function detect() {
  const model = await tf.loadGraphModel(
    'file://../tfjs_without_fft/model.json',
  );

  const now = DateTime.now();
  const gte = now.minus({ minutes: 5 }).toUTC().toISO();
  const lte = now.toUTC().toISO();
  const {
    data: { aggregations },
  } = await elastic().request({ data: queryBody(gte, lte) });

  const sample = R.map(
    (item: { point: { values: { '95.0': number | null } } }) =>
      item.point.values['95.0'] || 0,
    aggregations.window.buckets.slice(-180),
  );

  const normalizedSample = R.map(
    (val) => (val - MIN_VALUE) / (MAX_VALUE - MIN_VALUE),
    sample,
  );

  const tensor = tf.tensor(normalizedSample).reshape([-1, 180]);
  const reconstructions = (model.predict(tensor) as any).dataSync();
  const mse = tf.losses
    .meanSquaredError(normalizedSample, reconstructions)
    .dataSync()[0];

  logger.info({
    loss: mse,
    threshold: THRESHOLD,
    anomalous: mse > THRESHOLD,
    gte,
    lte,
  });

  if (mse > THRESHOLD) {
    // await SlackAPI.chat.post({
    //   channel: 'wallet-incident-alerts',
    //   text: 'An anomaly on the response times have been detected.',
    // });
  }
}
