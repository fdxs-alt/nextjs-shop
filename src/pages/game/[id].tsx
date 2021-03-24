import React from 'react'
import { useRouter } from 'next/router'
import { Image, useQuerySubscription } from 'react-datocms'
import { SINGLE_GAME } from '@graphql'
import { InfoList, Layout } from '@components'
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  List,
  Spinner,
} from '@chakra-ui/react'
import { IProduct } from 'types'
import { addToCart } from '@utils'
import { useCartActions } from '@store'

const SingleGame = () => {
  const { query } = useRouter()
  const { id } = query
  const { dispatch, createAddToCartToast } = useCartActions()
  const { data, error } = useQuerySubscription<{ game: IProduct }>({
    query: SINGLE_GAME,
    token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN,
    variables: { id },
  })

  return (
    <Layout
      isWithNavbar
      title={data ? data.game.name : error ? 'Error' : 'Loading...'}
    >
      {!data && !error && (
        <Center height="400px">
          <Spinner />
        </Center>
      )}
      {data && (
        <Flex
          alignItems="center"
          justifyContent="center"
          width="100%"
          maxWidth="1200px"
          margin="auto"
          spacing="30px"
          flexWrap="wrap"
        >
          <Image data={data.game.image.responsiveImage} />
          <Box maxWidth="700px" fontSize="20px" margin="50px" w="60%">
            <List spacing={3}>
              <InfoList item={data.game} />
            </List>
            <Button
              onClick={() => {
                dispatch(addToCart(data.game))
                createAddToCartToast()
              }}
              colorScheme="red"
              marginTop="20px"
            >
              Add game to the cart
            </Button>
          </Box>
        </Flex>
      )}
      {!data && error && (
        <Center>
          <Heading color="red.500">There is no such game</Heading>
        </Center>
      )}
    </Layout>
  )
}

export default SingleGame
