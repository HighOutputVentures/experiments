import { gql } from '../../../config/deps.ts';
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
  parent: Node!
  rank: Int!
  dateTimeCreated: DateTime!
}

type Column implements Node {
  id: OID!

  title: String!
  project: Project!
  cards: [RankedNode!]!
}

type Card implements Node {
  id: OID!

  title: String!
  description: String
  assignee: Account
  reporter: Account!
  dateTimeStarted: DateTime
  dateTimeFinished: DateTime
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

input UpdateRankdedNodeInput {
  rank: Int!
}

input CreateColumnInput {
  title: String!
  project: OID!
}

input UpdateColumnInput {
  title: String!
}

input AddProjectMemberInput {
  member: OID!
  project: OID!
}

input CreateCardInput {
  title: String!
  description: String
  assignee: OID
  project: OID!
  dateTimeStarted: DateTime
  dateTimeFinished: DateTime
}

input UpdateCardInput {
  title: String
  description: String
  assignee: OID
  dateTimeStarted: DateTime
  dateTimeFinished: DateTime
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

  addProjectMember(input: AddProjectMemberInput!): Boolean!

  updateRankedNode(id: OID!, input: UpdateRankdedNodeInput!): Boolean!
  deleteRankedNode(id: OID!): Boolean!
  
  createColumn(input: CreateColumnInput!): OID!
  updateColumn(id: OID!, input: UpdateColumnInput!): Boolean!
  deleteColumn(id: OID!): Boolean!

  createCard(input: CreateCardInput!): OID!
  updateCard(id: OID!, input: UpdateCardInput!): Boolean!
  deleteCard(id: OID!): Boolean!
}
`;
