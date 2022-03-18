import { gql } from '../../config/deps.ts';
export default gql`
scalar EmailAddress
scalar OID
scalar DateTime

interface Node {
  id: OID!
}

type Account implements Node {
  id: OID!
  email: EmailAddress!
  password: String

  projects: [Project!]!

  dateTimeCreated: DateTime!
}

type Project implements Node{
  id: OID!
  title: String!

  members: [Account]!
  creator: Account!
  dateTimeCreated: DateTime!

  columns: [RankedNode!]!
}


type RankedNode implements Node {
  id: OID!
  node: Node!
  rank: Int!
  dateTimeCreated: DateTime!
}

input AuthenticateAccountInput {
  email: EmailAddress!
  password: String
}

input CreateAccountInput {
  email: EmailAddress!
  password: String
}

input CreateProjectInput {
  title: String!
}

input UpdateProjectInput {
  title: String!
}

input CreateRankdedNodeInput {
  node: OID!
  rank: Int!
}

input UpdateRankdedNodeInput {
  rank: Int!
}

type Query {
  node(id: OID!): Node
  me: Account

  projects: [Project!]!
}

type Mutation {
  createAccount(input: CreateAccountInput!): OID!
  authenticateAccount(input: AuthenticateAccountInput!): String!
  revokeToken: Boolean!

  createProject(input: CreateProjectInput!): OID!
  updateProject(id: OID!, input: UpdateProjectInput!): Boolean!
  deleteProject(id: OID!): Boolean!

  createRankedNode(input: CreateRankdedNodeInput!): OID!
  updateRankedNode(id: OID!, input: UpdateRankdedNodeInput!): Boolean!
  deleteRankedNode(id: OID!): Boolean!
}
`;
