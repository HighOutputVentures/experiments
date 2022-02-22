/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetDiscordGuildInfoRequest } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GetDiscordGuildInfo
// ====================================================

export interface GetDiscordGuildInfo_getDiscordGuildInfo_data_guild_channels {
  __typename: "DiscordChannel";
  id: string;
  name: string;
  type: number;
}

export interface GetDiscordGuildInfo_getDiscordGuildInfo_data_guild {
  __typename: "DiscordGuildInfo";
  id: string;
  channels: GetDiscordGuildInfo_getDiscordGuildInfo_data_guild_channels[] | null;
}

export interface GetDiscordGuildInfo_getDiscordGuildInfo_data {
  __typename: "GetDiscordGuildInfoResponseData";
  guild: GetDiscordGuildInfo_getDiscordGuildInfo_data_guild | null;
}

export interface GetDiscordGuildInfo_getDiscordGuildInfo {
  __typename: "GetDiscordGuildInfoResponse";
  data: GetDiscordGuildInfo_getDiscordGuildInfo_data | null;
}

export interface GetDiscordGuildInfo {
  getDiscordGuildInfo: GetDiscordGuildInfo_getDiscordGuildInfo;
}

export interface GetDiscordGuildInfoVariables {
  request: GetDiscordGuildInfoRequest;
}
