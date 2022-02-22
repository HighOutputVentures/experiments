/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GenerateProjectAccessTokenRequest } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GetProjectAccess
// ====================================================

export interface GetProjectAccess_generateProjectAccessToken_data {
  __typename: "GenerateProjectAccessTokenResponseData";
  accessToken: string;
}

export interface GetProjectAccess_generateProjectAccessToken_error {
  __typename: "InvalidDiscordAccessTokenError" | "InvalidAuthenticationSignatureError" | "InvalidDiscordAuthorizationCodeError";
}

export interface GetProjectAccess_generateProjectAccessToken {
  __typename: "GenerateProjectAccessTokenResponse";
  data: GetProjectAccess_generateProjectAccessToken_data | null;
  error: GetProjectAccess_generateProjectAccessToken_error | null;
}

export interface GetProjectAccess {
  generateProjectAccessToken: GetProjectAccess_generateProjectAccessToken;
}

export interface GetProjectAccessVariables {
  request: GenerateProjectAccessTokenRequest;
}
