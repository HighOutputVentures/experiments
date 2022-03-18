import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

hydrate(
  <QueryClientProvider client={queryClient}>
    <RemixBrowser />
  </QueryClientProvider>,
  document
);
