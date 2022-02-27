/* eslint-disable camelcase */
import {
  Box,
  Grid,
  Image,
  Flex,
  Spinner,
  Center,
  Heading,
  Text,
  Stack,
  Fade,
  Button,
  useToast,
  Avatar,
} from '@chakra-ui/react'
import { useCollectionDetail } from '@hooks/useGetCollectionDetail'
import client from '@graphql/apolloClient'
import { GET_PROJECT } from '@graphql/queries/projects'
import { GetProject } from '../../types/GetProject'
import { FC, useEffect, useState } from 'react'
import { sign } from '@utils/sign'
import Onboard from 'bnc-onboard'
import Web3 from 'web3'
import { useRouter } from 'next/router'
import { CheckIcon, WarningTwoIcon } from '@chakra-ui/icons'
import { useMutation } from '@apollo/client'
import { GetProjectAccessVariables, GetProjectAccess } from '@types/GetProjectAccess'
import { GET_PROJECT_ACCESS } from '@graphql/mutations/project'
interface InviteProps {
  projectData: GetProject
}

const API = process.env.NEXT_PUBLIC_API_REDIRECT_URL || ''

const URL =
  'https://discord.com/api/oauth2/authorize?client_id=942737934946287617&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fimplicit%2F&response_type=code&scope=identify%20email%20guilds%20guilds.join'

const bg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23bdb9c2' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`

export const Invite: FC<InviteProps> = ({ projectData }) => {
  const toast = useToast()
  const { data, isLoading } = useCollectionDetail(projectData.node.contractAddress)
  const [getProjectAccess] = useMutation<GetProjectAccess, GetProjectAccessVariables>(GET_PROJECT_ACCESS, {
    onCompleted: (responseData: GetProjectAccess) => {
      if (!responseData.generateProjectAccessToken.error) {
        if (projectData.node) {
          router.push(
            `${API}?accessToken=${responseData.generateProjectAccessToken.data?.accessToken}&projectId=${projectData?.node.id}`
          )
        }
      } else {
        toast({
          title: 'Access Denied',
          description: `Seems like you're not eligible to access this space.`,
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'top',
          variant: 'left-accent',
        })
      }
    },
  })
  const [address, setAddress] = useState<string>('')
  const [onboard, setOnboard] = useState<onBoard | null>(null)
  const [signature, setSignature] = useState<{ signature: string; timestamp: string }>(null)
  const router = useRouter()
  const { access_token } = router.query

  useEffect(() => {
    const onbrd = Onboard({
      dappId: process.env.BLOCK_NATIVE,
      networkId: 4,
      subscriptions: {
        address: setAddress,
        wallet: (wallet) => {
          web3 = new Web3(wallet.provider)
        },
      },
      walletSelect: {
        wallets: [{ walletName: 'metamask' }],
      },
      walletCheck: [{ checkName: 'connect' }, { checkName: 'accounts' }],
    })
    setOnboard(onbrd)
  }, [])

  const onGetAccess = (signatureParams: string, timestamp: string, walletAddress: string) => {
    if (projectData?.node) {
      if (walletAddress && access_token && timestamp && signatureParams && projectData.node.id) {
        getProjectAccess({
          variables: {
            request: {
              projectId: projectData.node.id,
              discordAccessToken: access_token,
              ethAddress: walletAddress,
              signature: signatureParams,
              timestamp: timestamp,
              ttl: '',
            },
          },
        })
      }
    }
  }

  if (isLoading) {
    return (
      <Grid h="100vh" w="full" placeItems="center">
        <Spinner />
      </Grid>
    )
  }

  const onWalletConnect = async () => {
    if (onboard) {
      await onboard.walletSelect()
      await onboard.walletCheck()
      await onboard.accountSelect()
    }

    const { timestamp, signature: signatureFromSign } = await sign()
    setSignature({ timestamp, signature: signatureFromSign })

    const { address: walletAddress } = await onboard.getState()
    onGetAccess(signatureFromSign, timestamp, walletAddress)
  }

  const onConnectDiscord = () => router.push(`${URL}&state=${projectData.node.id}`)

  return (
    <Flex
      h="100vh"
      w="full"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
      backgroundImage={bg}
    >
      <Heading mb="20px" fontSize="46px">
        Grab your access now 🔥{' '}
      </Heading>
      <Fade in>
        <Center py={8}>
          <Box
            role={'group'}
            p={6}
            minW={'330px'}
            w={'full'}
            boxShadow={'md'}
            rounded={'lg'}
            pos={'relative'}
            zIndex={1}
            bg="white"
          >
            <Box
              rounded={'lg'}
              pos={'relative'}
              height={'230px'}
              _groupHover={{
                cursor: 'pointer',
                _after: {
                  filter: 'blur(20px)',
                },
              }}
            >
              {!isLoading && (
                <Image
                  rounded={'lg'}
                  height={230}
                  width={282}
                  objectFit={'cover'}
                  src={data?.collection.banner_image_url}
                  fallbackSrc={'/placeholder.png'}
                />
              )}
            </Box>
            <Stack pt={7} align={'center'}>
              <Heading fontSize={'24px'} fontWeight={600}>
                {projectData?.node?.name}
              </Heading>
              <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                {projectData?.node?.description}
              </Text>
            </Stack>
            <Flex
              w="full"
              justifyContent="center"
              alignItems="center"
              css={{
                gap: '6px',
              }}
              mt="30px"
            >
              <Avatar src={data?.image_url} borderRadius="full" shadow="md" h="30px" w="30px" />
              <Flex
                flexDir="row"
                justifyContent="center"
                alignItems="center"
                css={{
                  gap: '6px',
                }}
              >
                <Text color={'gray.700'} fontSize={'xs'} textTransform={'uppercase'} fontWeight="bold">
                  {data?.collection.name}
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Center>
      </Fade>
      <Flex flexDir="column" justifyContent="center" alignItems="center" mt="20px">
        <Flex>
          <Button
            colorScheme="orange"
            textColor="white"
            onClick={onWalletConnect}
            mr="10px"
            rightIcon={signature ? <CheckIcon /> : <WarningTwoIcon />}
          >
            Metamask
          </Button>
          <Button
            variant="solid"
            colorScheme="blue"
            textColor="white"
            onClick={onConnectDiscord}
            rightIcon={access_token ? <CheckIcon /> : <WarningTwoIcon />}
          >
            Discord
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Invite

export const getServerSideProps = async (context) => {
  const projectData = await client.query<GetProject>({
    query: GET_PROJECT,
    variables: {
      id: context.query.id,
    },
  })

  if (!projectData) {
    return {
      redirect: {
        destination: '/404',
      },
    }
  }
  return {
    props: {
      projectData: projectData.data,
    },
  }
}
