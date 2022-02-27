/* eslint-disable camelcase */
import { Grid, Flex, Text, Heading, Image, Box } from '@chakra-ui/react'
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { login } from '@utils/authUtils'
import { useMutation } from '@apollo/client'
import { GenerateAccessTokenByGoogleVariables, GenerateAccessTokenByGoogle } from '../types/GenerateAccessTokenByGoogle'
import { GENERATE_ACCESS_TOKEN_FROM_GOOGLE } from '@graphql/mutations/auth'
import Cookies from 'js-cookie'

const bg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23bdb9c2' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`

export const Signup = () => {
  const [getAccessToken] = useMutation<GenerateAccessTokenByGoogle, GenerateAccessTokenByGoogleVariables>(
    GENERATE_ACCESS_TOKEN_FROM_GOOGLE,
    {
      onCompleted: (data: GenerateAccessTokenByGoogle) => {
        const accessToken = data.generateAccessTokenByGoogle.data?.accessToken
        if (accessToken) {
          login(accessToken, '/welcome')
        }
      },
    }
  )

  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if (response.accessToken) {
      const token: string = response.accessToken as string
      getAccessToken({
        variables: {
          request: {
            accessToken: token,
          },
        },
      })
    }
    const profile = JSON.stringify(response.profileObj)
    profile && Cookies.set('google_profile', profile)
  }

  return (
    <Grid placeItems="center" h="100vh" backgroundImage={bg} bg="#fffff">
      <Grid gridTemplateColumns="1fr 1fr" h="500px" w="900px" pos="relative">
        <Box
          style={{ filter: 'blur(10px)' }}
          opacity="0.6"
          position="absolute"
          w="full"
          h="full"
          backgroundColor="white"
        />
        <Flex
          zIndex="10"
          flexDir="column"
          justify="center"
          alignItems="center"
          borderRadius="6px"
          p="20px"
          css={{
            gap: '20px',
          }}
        >
          <Heading fontSize="54px" fontWeight="bold" textColor="gray.800">
            Token Gating
          </Heading>
          <Text textAlign="center" textColor="gray.600">
            Token gating is a way of super-charging a NFT, giving ownership of it more meaning.
          </Text>
          <GoogleLogin
            clientId="170683676664-p6purmiveulul6b7gcgugldqlag3tb60.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </Flex>
        <Flex justifyContent="center" alignItems="center" zIndex="10">
          <Image
            borderRadius="6px"
            shadow="2xl"
            h="500px"
            src="https://images.unsplash.com/photo-1640340434868-6877662a809f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
          ></Image>
        </Flex>
      </Grid>
    </Grid>
  )
}

export default Signup
