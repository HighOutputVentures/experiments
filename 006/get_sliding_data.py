def get_sliding_data(total_points, window_size):
  datapoints = []
  for i in range(len(total_points) - window_size + 1):
    window = list(total_points[i: i + window_size])
    datapoints.append(window)

  return datapoints;
