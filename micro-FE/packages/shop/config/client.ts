import { GraphQLClient } from "graphql-request";

const hygraphContentApi =
  "https://api-ap-northeast-1.hygraph.com/v2/clb4mwq1o09dn01uf6xol9zxb/master";

const client = new GraphQLClient(hygraphContentApi);

export default client;
