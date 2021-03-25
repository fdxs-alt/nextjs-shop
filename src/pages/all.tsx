import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spinner,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { Layout, SingleProduct } from '@components'
import { useCartActions } from '@store'
import { addToCart } from '@utils'
import { ALL_CATEGORIES, ALL_GAMES, request } from 'graphqlAPI'
import { GetStaticProps } from 'next'
import React, { useCallback, useEffect, useState } from 'react'
import { IProduct } from 'types'

interface Props {
  categories: string[]
  platforms: string[]
}

const All: React.FC<Props> = ({ categories, platforms }): JSX.Element => {
  const [genre, setGenre] = useState('')
  const [platform, setPlatform] = useState(platforms[0])
  const [name, setName] = useState('')
  const [skip, setSkip] = useState(0)
  const [games, setGames] = useState<{ allGames: IProduct[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const { dispatch, createAddToCartToast } = useCartActions()

  const fetchGames = useCallback(async () => {
    const data = await request<{ allGames: IProduct[] }>({
      query: ALL_GAMES,
      variables: { genre, platform, name, skip: skip * 20 },
    })
    setGames(data)
    setLoading(false)
  }, [genre, name, skip, platform])

  useEffect(() => {
    setSkip(0)
  }, [genre, name, platform])

  useEffect(() => {
    setLoading(true)
    const id = setTimeout(() => fetchGames(), 400)

    return () => {
      clearTimeout(id)
    }
  }, [genre, platform, name, skip, fetchGames])

  return (
    <Layout title="All games" isWithNavbar>
      <Flex
        w="60%"
        justify="space-between"
        alignItems="center"
        margin="auto"
        flexWrap="wrap"
      >
        <Box>
          <Text fontSize="18px" fontWeight={600}>
            Select platform:
          </Text>
          <Select
            w="300px"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            {platforms.map((el, i) => (
              <option value={el} key={i}>
                {el}
              </option>
            ))}
          </Select>
        </Box>
        <FormControl p="6px 0" id="search" w="300px">
          <FormLabel>Search</FormLabel>
          <Input
            name="search"
            as={Input}
            type="text"
            placeholder="Search for a game"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <Box w="400px">
          <Text fontSize="18px" fontWeight={600}>
            Select game genres:
          </Text>
          <Wrap spacing="20px">
            {categories.map((el, i) => (
              <WrapItem key={i}>
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      setGenre((prev) => prev + `(?=.*${el})`)
                    } else {
                      setGenre((prev) => prev.replace(`(?=.*${el})`, ''))
                    }
                  }}
                >
                  {el}
                </Checkbox>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </Flex>
      {!loading ? (
        <Wrap
          w="80%"
          maxW="1200px"
          margin="100px auto"
          spacing="50px"
          justify="center"
        >
          {games.allGames.length !== 0 ? (
            games.allGames.map((el) => (
              <SingleProduct
                product={el}
                key={el.id}
                handleClick={(product: IProduct) => {
                  dispatch(addToCart(product))
                  createAddToCartToast()
                }}
              />
            ))
          ) : (
            <Heading fontSize="26px">No games</Heading>
          )}
        </Wrap>
      ) : (
        <Center height="400px">
          <Spinner />
        </Center>
      )}
      {games && games.allGames.length === 20 && !loading && (
        <Button
          colorScheme="red"
          onClick={() => setSkip((prev) => prev + 1)}
          w="fit-content"
          margin="auto"
        >
          Next page
        </Button>
      )}
    </Layout>
  )
}

export default All

export const getStaticProps: GetStaticProps = async () => {
  const { allGames } = await request<{
    allGames: { category: string; platform: string }[]
  }>({
    query: ALL_CATEGORIES,
  })

  const categories = Array.from(
    new Set(allGames.map((el) => el.category.split(',')).flat())
  )

  const platforms = Array.from(new Set(allGames.map((el) => el.platform)))

  return { props: { categories, platforms }, revalidate: 3600 }
}
