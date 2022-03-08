import { gql } from '../../config/deps.ts';
export const typeDefs = gql`
type Account {
  id: ID!
  email: String!
  password: String
}

type Query {
  account(id: ID!): Account
}

input CreateAccountInput {
  email: String!
  password: String
}

type Mutation {
  createAccount(input: CreateAccountInput): Boolean!
}
`;
