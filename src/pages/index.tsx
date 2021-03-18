import React from 'react'
import { Layout, SingleProduct } from '@components'
import { useQuerySubscription } from 'react-datocms'
import { FeatureGamesQuery } from '@graphql'
import { Wrap, Center, Spinner, Box, Heading } from '@chakra-ui/react'

const Home: React.FC = (): JSX.Element => {
  const { data } = useQuerySubscription({
    query: FeatureGamesQuery,
    variables: { featured: true },
    token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN as string,
  })

  return (
    <Layout title="Home" isWithNavbar={true}>
      <Box padding="50px">
        <Heading as="h2" textAlign="center">
          Featured right now!
        </Heading>

        {data ? (
          <Wrap w="80%" maxW="1200px" margin="100px auto">
            {data.allGames.map((el) => (
              <SingleProduct product={el} key={el.id} />
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
