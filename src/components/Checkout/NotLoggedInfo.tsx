import { Center, Heading, Link, Text } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'

const NotLoggedInfo = ({ message }: { message: string }) => {
  return (
    <Center h="600px" d="flex" flexDirection="column">
      <Heading fontSize="25px">User not logged in</Heading>
      <Text fontSize="20px">{message}</Text>
      <NextLink passHref={true} href="/signin">
        <Link fontSize="20px" textDecoration="underline" color="red.700">
          Click to login!
        </Link>
      </NextLink>
    </Center>
  )
}

export default NotLoggedInfo
