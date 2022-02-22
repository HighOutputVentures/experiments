/* eslint-disable camelcase */
import axios from 'axios'

type Channel = {
  id: string
  type: number
  name: string
  position: number
  parent_id: string | null
  guild_id: string | null
  permission_overwrites: string[]
  nsfw: boolean
}

export default {
  getChannelID: (guildId: string) => async () => {
    const result = await axios.get<Channel[]>(`${process.env.NEXT_PUBLIC_DISCORD_URI}guilds/${guildId}/channels`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bot ${process.env.BOT_TOKEN}`,
      },
    })
    return result.data
  },
}
