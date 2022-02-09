import { gql } from 'apollo-server-koa';

export default gql`
type InvalidGoogleAccessTokenError implements Error {
  message: String!
}

union GenerateAccessTokenByGoogleError = InvalidGoogleAccessTokenError

type GenerateAccessTokenByGoogleResponseData {
  accessToken: String!
}

type GenerateAccessTokenByGoogleResponse {
  error: GenerateAccessTokenByGoogleError
  data: GenerateAccessTokenByGoogleResponseData
}

input GenerateAccessTokenByGoogleRequest {
  accessToken: String!
}

type InvalidGoogleAccessTokenError implements Error {
  message: String!
}

union GenerateAccessTokenByGoogleError = InvalidGoogleAccessTokenError

type GenerateProjectAccessTokenResponseData {
  accessToken: String!
}

type GenerateAccessTokenByGoogleResponse {
  error: GenerateAccessTokenByGoogleError
  data: GenerateProjectAccessTokenResponseData
}

input GenerateProjectAccessTokenRequest {
  discordAccessToken: String!
  ethAddress: String!
  timestamp: DateTime!
  signature: String!
  ttl: Duration
}

type Mutation {
  generateAccessTokenByGoogle(request: GenerateAccessTokenByGoogleRequest): GenerateAccessTokenByGoogleResponse!
  generateProjectAccessToken(request: GenerateProjectAccessTokenRequest): generateProjectAccessTokenResponse!
}
`;
