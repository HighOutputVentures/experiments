import { useEffect, useState } from "react";

export const useFetch = (loader, delay = 0) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<typeof loader>(true);
  useEffect(() => {
    loader(delay)
      .then((response: typeof loader) => setData(response))
      .finally(() => {
        setIsLoading(false);
      });
  });

  return [data, isLoading];
};

export default useFetch;
