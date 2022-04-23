from extract_values import extract_values
from get_raw_data import get_raw_data
from get_sliding_data import get_sliding_data


def prepare_samples(start, end):
  raw_data = get_raw_data(start=start, end=end)
  values = extract_values(raw_data)
  samples = get_sliding_data(values, 180)
  return samples;
