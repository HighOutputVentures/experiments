import { gql } from '@apollo/client'

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      edges {
        node {
          ... on Project {
            contractAddress
            name
            description
            id
          }
        }
      }
      totalCount
    }
  }
`

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    node(id: $id) {
      ... on Project {
        id
        name
        contractAddress
        description
      }
    }
  }
`

export const GET_DISCORD_GUILD_INFO = gql`
  query GetDiscordChannels($guildId: String!) {
    getDiscordChannels(guildId: $guildId) {
      data {
        channels {
          id
          name
          type
        }
      }
    }
  }
`
