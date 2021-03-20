import React from 'react'
import { Layout, SingleProduct } from '@components'
import { useQuerySubscription } from 'react-datocms'
import { FeatureGamesQuery } from '@graphql'
import { Wrap, Center, Spinner, Box, Heading } from '@chakra-ui/react'
import { IProduct } from 'types'
import { useCartActions } from '@store'
import { addToCart } from '@utils'
const Home: React.FC = (): JSX.Element => {
  const { data } = useQuerySubscription<{ allGames: IProduct[] }>({
    query: FeatureGamesQuery,
    variables: { featured: true },
    token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN as string,
  })
  const dispatch = useCartActions()

  return (
    <Layout title="Home" isWithNavbar={true}>
      <Box padding="50px">
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
      </Box>
    </Layout>
  )
}

export default Home
