/* eslint-disable camelcase */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Button,
  useDisclosure,
  FormControl,
  Input,
  chakra,
  Select,
  Box,
  Text,
} from '@chakra-ui/react'
import { FC, useCallback, useEffect, useState } from 'react'
import { useAddNewProjectModal, AddNewProjectModal } from '@store/userStore'
import { useForm } from 'react-hook-form'
import { useLazyQuery as useQueryApollo, useMutation } from '@apollo/client'
import { CREATE_PROJECT } from '@graphql/mutations/project'
import { GET_DISCORD_GUILD_INFO } from '@graphql/queries/projects'
import { CreateProjectVariables, CreateProject, CreateProjectRequest } from '../types/CreateProject'
import cookie from 'js-cookie'
import { useQuery } from 'react-query'
import getQueries from '@services/queries'
import { useRouter } from 'next/router'

interface AddNewProjectProps {
  onComplete: () => void
}

const defaultFormValues = {
  name: '',
  description: '',
  contractAddress: '',
  discordGuild: '',
  discordChannel: '',
}

type Channel = {
  id: string
  name: string
  type: number
}

const url2 =
  'https://discord.com/api/oauth2/authorize?client_id=942737934946287617&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fdiscord&response_type=code&scope=guilds%20guilds.join%20identify%20email%20bot%20guilds.members.read'

const AddNewProject: FC<AddNewProjectProps> = ({ onComplete }) => {
  const router = useRouter()
  const { state: paramsState } = router.query
  const discordToken = cookie.get('discord_token')
  const [addProject] = useMutation<CreateProject, CreateProjectVariables>(CREATE_PROJECT, {
    onCompleted: () => {
      onComplete()
      setShow(false)
    },
  })
  const [setShow, show] = useAddNewProjectModal((state: AddNewProjectModal) => [state.setShow, state.show])
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const { isOpen } = useDisclosure({
    isOpen: show,
  })

  const { register, handleSubmit, formState, watch } = useForm({
    defaultValues: { ...defaultFormValues, discordGuild: paramsState || '' },
  })

  const { data: channels, isLoading } = useQuery(`get-discord-@me-channels-${discordToken}`, getQueries.getChannels(), {
    enabled: !!discordToken,
  })

  const guildId = watch('discordGuild')
  const channelId = watch('discordChannel')

  const [getChannels, { data: channelIds, loading: channelsLoading }] = useQueryApollo(GET_DISCORD_GUILD_INFO, {
    fetchPolicy: 'no-cache',
    onCompleted: (discordChannels) => {
      if (discordChannels.getDiscordChannels.data.channels.length === 0) {
        setShowAlert(true)
      }
    },
  })

  const onGetChannels = useCallback(async () => {
    if (guildId && guildId !== 'undefined') {
      getChannels({
        variables: {
          guildId,
        },
      })
    }
  }, [guildId, getChannels])

  const onChannelVerify = () => {
    router.push(`${url2}&state=${guildId}&guild_id=${guildId}&disable_guild_select=true`)
  }

  useEffect(() => {
    setShowAlert(false)
    guildId && show && onGetChannels()
  }, [guildId, onGetChannels, show])

  useEffect(() => {
    const refetchQuery = () => guildId && onGetChannels()
    window.addEventListener('focus', refetchQuery)
    return () => window.removeEventListener('focus', refetchQuery)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { isSubmitting } = formState

  const onSubmit = async (data: CreateProjectRequest) => {
    if (discordToken && data) {
      await addProject({
        variables: {
          request: data,
        },
      })
    }
  }

  const onClose = () => setShow(false)

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>New Project</ModalHeader>
          <ModalBody>
            <chakra.form onSubmit={handleSubmit(onSubmit)}>
              <FormControl mb="10px">
                <Select
                  id="discordGuild"
                  type="text"
                  size="sm"
                  {...register('discordGuild')}
                  disabled={isLoading}
                  placeholder=""
                >
                  {channels?.map((guild) => (
                    <option key={guild.id} value={guild.id}>
                      {guild.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mb="10px">
                <Select
                  id="discordChannel"
                  type="text"
                  size="sm"
                  {...register('discordChannel', { required: true })}
                  disabled={channelsLoading}
                  placeholder={channelsLoading ? 'Fetching channels...' : ''}
                >
                  {channelIds?.getDiscordChannels.data.channels
                    .filter((channelFilter: Channel) => channelFilter.type !== 4)
                    .map((channel: Channel) => (
                      <option key={channel.id} value={channel.id}>
                        {channel.name}
                      </option>
                    ))}
                </Select>
              </FormControl>
              {showAlert && (
                <Text
                  textAlign="center"
                  mb="10px"
                  color="red"
                  fontSize="sm"
                  textDecor="underline"
                  onClick={onChannelVerify}
                  _hover={{
                    cursor: 'pointer',
                  }}
                >
                  Click here to allow the TG bot to access this server
                </Text>
              )}
              <Box position="relative">
                {(!channelId || showAlert) && (
                  <Box
                    position="absolute"
                    h="full"
                    w="full"
                    bg={'gray.50'}
                    unselectable={'off'}
                    opacity="0.6"
                    zIndex="10"
                  ></Box>
                )}

                <FormControl mb="10px">
                  <Input
                    id="name"
                    type="text"
                    size="sm"
                    placeholder="Project name"
                    {...register('name', { required: true })}
                    textColor="gray.700"
                  />
                </FormControl>
                <FormControl mb="10px">
                  <Input
                    id="decription"
                    type="text"
                    size="sm"
                    placeholder="Description"
                    {...register('description', { required: true })}
                    textColor="gray.700"
                  />
                </FormControl>
                <FormControl mb="10px">
                  <Input
                    id="address"
                    type="text"
                    size="sm"
                    placeholder="Collection Contract Address"
                    {...register('contractAddress', { required: true })}
                    textColor="gray.700"
                  />
                </FormControl>
              </Box>
              <Button
                type="submit"
                colorScheme="white"
                color="gray.700"
                border="2px solid gray"
                mr={3}
                isLoading={isSubmitting}
                w="full"
                mt="15px"
                mb="20px"
              >
                Submit
              </Button>
            </chakra.form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddNewProject
