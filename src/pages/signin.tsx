import React from 'react'
import { Box, Button, Center, Flex, Heading } from '@chakra-ui/react'
import { providers, SessionProvider, signIn } from 'next-auth/client'
import { NextPage } from 'next'
import { Layout } from '@components'

interface GetProvidersResponse {
  [provider: string]: SessionProvider
}

interface Props {
  providers?: GetProvidersResponse | null
}

const SignInPage: NextPage<Props> = ({ providers }) => {
  return (
    <Layout title="Signin">
      <Flex w="50%" background="red.600" justifyContent="center">
        <Center>
          <Box color="white">
            <Heading as="h1" textAlign="center" mb="30px" fontWeight="600">
              Sign in right now!
            </Heading>
            <Heading
              as="h5"
              textAlign="center"
              textDecor="underline"
              fontSize={30}
              fontWeight="600"
            >
              Next-shop
            </Heading>
          </Box>
        </Center>
      </Flex>
      <Flex
        w="50%"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        {providers &&
          Object.values(providers).map((provider) => (
            <Button
              key={provider.id}
              mb={10}
              fontSize={18}
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </Button>
          ))}
      </Flex>
    </Layout>
  )
}

export default SignInPage

SignInPage.getInitialProps = async () => {
  return {
    providers: await providers(),
  }
}
