/* eslint-disable camelcase */
import axios from 'axios'
import cookie from 'js-cookie'

export type ChannelType = {
  icon: string
  id: string
  name: string
  owner: boolean
  permission: string
}

export type CollectionType = {
  image_url: string
  schema_name: string
  address: string
  collection: {
    banner_image_url: string
    name: string
    description: string
  }
}

export default {
  getMe: () => async () => {
    const result = await axios.get<{ id: string; avatar: string; username: string }>(
      `${process.env.NEXT_PUBLIC_DISCORD_URI}users/@me`,
      {
        headers: {
          Authorization: `Bearer ${cookie.get('discord_token')}`,
        },
      }
    )
    return result.data
  },
  getChannels: () => async () => {
    const result = await axios.get<ChannelType[]>(`${process.env.NEXT_PUBLIC_DISCORD_URI}users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${cookie.get('discord_token')}`,
      },
    })
    return result.data.filter((guild) => guild.owner)
  },
  getCollectionInfo: (collectionAddress: string) => async () => {
    const result = await axios.get<CollectionType>(`${process.env.OPENSEA_API}/${collectionAddress}`, {
      headers: {
        Authorization: `Bearer ${cookie.get('discord_token')}`,
      },
    })
    return result.data
  },
}
