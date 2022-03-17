import { gql } from '../../config/deps.ts';
export default gql`
scalar EmailAddress
scalar OID

interface Node {
  id: OID!
}

type Account implements Node {
  id: OID!
  email: EmailAddress!
  password: String
}

input AuthenticateAccountInput {
  email: EmailAddress!
  password: String
  token: String
}

input CreateAccountInput {
  email: EmailAddress!
  password: String
}


type Query {
  node(id: OID!): Node
}

type Mutation {
  createAccount(input: CreateAccountInput!): OID!
  authenticateAccount(input: AuthenticateAccountInput!): String!
  revokeToken: Boolean!
}
`;
