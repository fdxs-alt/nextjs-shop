import React from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import { Layout } from '@components'
import { Flex, Heading, Link } from '@chakra-ui/layout'

const NotFound = () => {
  return (
    <Layout title="404 | Not found">
      <Flex
        justifyContent="center"
        alignItems="center"
        w="100%"
        flexDirection="column"
      >
        <Image src="/404-error.svg" width={200} height={200} />
        <Heading as="h2" mb={5}>
          Page not found
        </Heading>
        <Link as={NextLink} href="/" passHref={true}>
          <b style={{ cursor: 'pointer', color: '#9C4221', fontSize: '18px' }}>
            Click to move to main page
          </b>
        </Link>
      </Flex>
    </Layout>
  )
}

export default NotFound
