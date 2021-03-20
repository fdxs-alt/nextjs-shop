import { Center, Heading, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'

const NoGames = () => {
  return (
    <Center d="flex" flexDir="column" p="10px">
      <Heading textAlign="center" fontSize="22px">
        There are no games in your cart{' '}
        <span aria-label="emoji" role="img">
          🙁
        </span>
      </Heading>
      <NextLink href="/" passHref={true}>
        <Link p="0 10px" fontSize={20} textDecoration="underline" mt="20px">
          Go to main page and find next game!
        </Link>
      </NextLink>
    </Center>
  )
}

export default NoGames
