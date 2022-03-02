import { gql } from '../config/deps.ts';
export const typeDefs = (gql)`
"""
QUERY & MUTATION
"""
type Query {
  ping: String!
}
type Mutation {
  pong: Boolean
}
`;
