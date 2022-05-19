import * as tf from '@tensorflow/tfjs-node';
import { DateTime } from 'luxon';
import R from 'ramda';
import elastic from './lib/elastic';

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

const minValue = 0.0;
const maxValue = 50869.4;
const threshold = 0.0009913438;

(async function () {
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
    (val) => (val - minValue) / (maxValue - minValue),
    sample,
  );

  const model = await tf.loadGraphModel(
    'file://../tfjs_without_fft/model.json',
  );

  const tensor = tf.tensor(normalizedSample);
  const reconstructions = model.predict(tensor.reshape([-1, 180]));

  // Get the loss (mse) of reconstruction vs input normalizedSample.
  // If loss is greater than the threshold then anomaly is detected.
})();
