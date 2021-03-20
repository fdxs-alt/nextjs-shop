import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { ClearCart, Layout, CartSingleProduct } from '@components'
import { useCartActions, useCartState } from '@store'
import { addToCart, removeFromCart, resetCart } from '@utils'
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
        <Flex flexDirection="column">
          <Flex
            w="50%"
            margin="20px auto"
            justify="space-between"
            alignItems="center"
          >
            <Text fontSize="25px" fontWeight={600}>
              Quantity: {quantity}
            </Text>
            <Text fontSize="25px" fontWeight={600}>
              Cart value: {cartValue} $
            </Text>
            <ClearCart
              clearCart={() => dispatch(resetCart())}
              disabled={quantity !== 0}
            />
          </Flex>
          <Flex w="60%" flexDirection="column" margin="10px auto">
            <Heading as="h4" fontSize="20">
              All products in your cart:
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
        </Flex>
      </Box>
    </Layout>
  )
}

export default CartPage
