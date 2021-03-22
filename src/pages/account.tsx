import { Flex, Center, Spinner } from '@chakra-ui/react'
import { Layout, NotLoggedInfo } from '@components'
import { useSession } from 'next-auth/client'
import React from 'react'

const Account = () => {
  const [session, loading] = useSession()
  return (
    <Layout isWithNavbar={true} title="My account">
      <Flex p="50px" flexDir="column">
        {loading ? (
          <Center height="600px">
            <Spinner />
          </Center>
        ) : session ? (
          <Center>lol</Center>
        ) : (
          <NotLoggedInfo message="You must login to access your account!" />
        )}
      </Flex>
    </Layout>
  )
}

export default Account
