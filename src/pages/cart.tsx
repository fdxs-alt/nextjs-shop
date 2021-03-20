import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { Layout, CartSingleProduct, NoGames, InfoPanel } from '@components'
import { useCartActions, useCartState } from '@store'
import { addToCart, removeFromCart } from '@utils'
import React from 'react'
import { Product } from 'types'

const CartPage: React.FC = (): JSX.Element => {
  const { cartValue, products, quantity } = useCartState()
  const dispatch = useCartActions()

  return (
    <Layout title="Cart" isWithNavbar={true}>
      <Box w="100%" margin="100px auto" padding="30px">
        <Heading as="h1" textAlign="center" color="red.900" mb="30px">
          Your cart
        </Heading>
        {products.length !== 0 ? (
          <Flex flexDirection="column">
            <Flex w="60%" flexDirection="column" margin="10px auto">
              <Heading as="h4" fontSize="20">
                All games in your cart:
              </Heading>
              {products.map((prod) => (
                <CartSingleProduct
                  key={prod.id}
                  product={prod}
                  handleRemoveFromCart={(product: Product) =>
                    dispatch(removeFromCart(product))
                  }
                  handleAddToCart={(product: Product) =>
                    dispatch(addToCart(product))
                  }
                />
              ))}
            </Flex>
            <InfoPanel quantity={quantity} cartValue={cartValue} />
            <Button
              w="fit-content"
              alignSelf="center"
              size="lg"
              mt="20px"
              colorScheme="red"
            >
              Checkout
            </Button>
          </Flex>
        ) : (
          <NoGames />
        )}
      </Box>
    </Layout>
  )
}

export default CartPage
