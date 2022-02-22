import { Button, Text, Menu, MenuButton, MenuList, MenuItem, Avatar, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import cookie from 'js-cookie'
import getQueries, { ChannelType } from '@services/queries'
import { useQuery } from 'react-query'

const scrollBar = {
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'black',
    borderRadius: '24px',
  },
}

const admin = process.env.OAUTH2_ADMIN

export const ConnectDiscord = () => {
  const discordToken = cookie.get('discord_token')
  const { data, isLoading } = useQuery(`get-discord-@me`, getQueries.getMe(), {
    enabled: !!discordToken,
  })
  const { data: channels } = useQuery(`get-discord-@me-channels`, getQueries.getChannels(), {
    enabled: !!discordToken,
  })

  const router = useRouter()
  const onConnectDiscord = () => router.push(admin)

  if (discordToken && !isLoading)
    return (
      <Flex placeItems="center">
        <Menu>
          <MenuButton
            as={Button}
            borderBottom="2px solid #738ADB"
            color="gray.600"
            bg="white"
            _active={{
              bg: 'white',
            }}
            _hover={{
              bg: 'white',
            }}
            shadow="md"
          >
            <Flex>
              <Avatar
                src={`https://cdn.discordapp.com/avatars/${data?.id}/${data?.avatar}.webp?size=40`}
                h="20px"
                w="20px"
                shadow="md"
                mr="10px"
              />
              <Text>{data?.username}</Text>
            </Flex>
          </MenuButton>
          <MenuList maxH="70vh" overflow="auto" css={scrollBar}>
            {channels?.map((channel: ChannelType) => {
              return (
                <MenuItem minH="48px" key={channel.id}>
                  <Avatar
                    name={channel.name}
                    boxSize="2rem"
                    borderRadius="full"
                    src={
                      channel.icon ? `https://cdn.discordapp.com/icons/${channel.id}/${channel.icon}.webp?size=100` : ''
                    }
                    mr="12px"
                  />
                  <span>{channel.name}</span>
                </MenuItem>
              )
            })}
          </MenuList>
        </Menu>
      </Flex>
    )

  return (
    <Button
      onClick={onConnectDiscord}
      borderBottom="2px solid gray"
      ml="10px"
      shadow="md"
      variant="outline"
      color="gray.700"
      bg="white"
      _hover={{
        cursor: 'pointer',
      }}
    >
      Discord
    </Button>
  )
}

export default ConnectDiscord
