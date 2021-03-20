import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Product } from 'types'
import { Image } from 'react-datocms'
interface Props {
  product: Product
  handleAddToCart: (prod: Product) => void
  handleRemoveFromCart: (prod: Product) => void
}

const CartSingleProduct: React.FC<Props> = ({ product }) => {
  return (
    <Flex
      justify="space-between"
      alignItems="center"
      p="10px"
      borderColor="red.800"
      borderWidth="2px"
      borderStyle="solid"
      borderRadius="8px"
      marginTop="15px"
    >
      <Image data={product.image.responsiveImage} />
    </Flex>
  )
}

export default CartSingleProduct
