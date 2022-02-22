/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateProjectRequest {
  name: string;
  description?: string | null;
  contractAddress: string;
  discordGuild: string;
  discordChannel: string;
  discordAccessToken: string;
}

export interface DeleteProjectRequest {
  id: string;
}

export interface GenerateAccessTokenByGoogleRequest {
  accessToken: string;
}

export interface GenerateProjectAccessTokenRequest {
  projectId: string;
  discordAccessToken: string;
  ethAddress: string;
  timestamp: any;
  signature: string;
  ttl?: any | null;
}

export interface GetDiscordGuildInfoRequest {
  guildId: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
