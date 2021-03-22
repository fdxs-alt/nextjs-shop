import { Flex } from '@chakra-ui/react'
import { AllOrders, Layout, NotLoggedInfo } from '@components'
import { GetServerSideProps } from 'next'
import { getSession, Session } from 'next-auth/client'
import React from 'react'

const Account = ({ session }: { session: Session }) => {
  return (
    <Layout isWithNavbar={true} title="My account">
      <Flex p="50px" flexDir="column">
        {session ? (
          <AllOrders />
        ) : (
          <NotLoggedInfo message="You must login to access your account!" />
        )}
      </Flex>
    </Layout>
  )
}

export default Account

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  return { props: { session } }
}
