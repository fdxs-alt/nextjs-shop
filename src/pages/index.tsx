import React from 'react'
import { Layout, SingleProduct } from '@components'
import { useQuerySubscription } from 'react-datocms'
import { FeatureGamesQuery } from 'graphqlAPI'
import { Wrap, Center, Spinner, Heading, Button, Flex } from '@chakra-ui/react'
import { IProduct } from 'types'
import { useCartActions } from '@store'
import { addToCart } from '@utils'
import Link from 'next/link'
const Home: React.FC = (): JSX.Element => {
  const { data } = useQuerySubscription<{ allGames: IProduct[] }>({
    query: FeatureGamesQuery,
    variables: { featured: true },
    token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN as string,
  })

  const dispatch = useCartActions()

  return (
    <Layout title="Home" isWithNavbar={true}>
      <Flex padding="50px" flexDir="column">
        <Heading as="h2" textAlign="center">
          Featured right now!
        </Heading>

        {data ? (
          <Wrap
            w="80%"
            maxW="1200px"
            margin="100px auto"
            spacing="50px"
            justify="center"
          >
            {data.allGames.map((el) => (
              <SingleProduct
                product={el}
                key={el.id}
                handleClick={(product: IProduct) =>
                  dispatch(addToCart(product))
                }
              />
            ))}
          </Wrap>
        ) : (
          <Center height="600px">
            <Spinner />
          </Center>
        )}
        <Link href="/all">
          <Button colorScheme="red" margin="auto" size="lg">
            Check more!
          </Button>
        </Link>
      </Flex>
    </Layout>
  )
}

export default Home
