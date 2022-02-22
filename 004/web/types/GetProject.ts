/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProject
// ====================================================

export interface GetProject_node {
  __typename: "Project";
  id: string;
  name: string;
  contractAddress: string;
  description: string | null;
}

export interface GetProject {
  node: GetProject_node | null;
}

export interface GetProjectVariables {
  id: string;
}
