import { Button, Flex, Heading, Link, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { signOut, useSession } from 'next-auth/client'
import { useCartState } from '@store'

const Navbar = () => {
  const [session, loading] = useSession()
  const { quantity } = useCartState()
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      h="fit-content"
      p="20px"
      w="80%"
      margin="0 auto"
    >
      <Flex alignItems="center" color="red.600">
        <Image src="/computer.svg" width={125} height={90} />
        <Heading as="h3">Next-shop</Heading>
      </Flex>
      <Flex alignItems="center">
        <NextLink href="/">
          <Link p="0 10px" fontSize={20}>
            Home
          </Link>
        </NextLink>
        <NextLink href="/account">
          <Link p="0 10px" fontSize={20}>
            My account
          </Link>
        </NextLink>
        <NextLink href="/cart">
          <Link p="0 10px" fontSize={20} d="flex" alignItems="center">
            <NextImage src="/cart.svg" alt="cart" width={30} height={30} />
            <Text ml="15px">Items in cart: {quantity}</Text>
          </Link>
        </NextLink>
        {loading ? (
          <Spinner m="0 10px" />
        ) : session ? (
          <Button colorScheme="red" m="0 10px" onClick={() => signOut()}>
            Sign out
          </Button>
        ) : (
          <NextLink href="/signin">
            <Button colorScheme="red" m="0 10px">
              Sign in
            </Button>
          </NextLink>
        )}
      </Flex>
    </Flex>
  )
}

export default Navbar
