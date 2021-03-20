import { Flex, Heading, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { Product } from 'types'
import { Image } from 'react-datocms'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
interface Props {
  product: Product
  handleAddToCart: (prod: Product) => void
  handleRemoveFromCart: (prod: Product) => void
}

const CartSingleProduct: React.FC<Props> = ({
  product,
  handleAddToCart,
  handleRemoveFromCart,
}) => {
  return (
    <Flex
      justify="space-between"
      alignItems="center"
      p="25px"
      borderColor="red.800"
      borderWidth="2px"
      borderStyle="solid"
      borderRadius="8px"
      marginTop="15px"
    >
      <Image data={product.image.responsiveImage} />
      <Heading as="h5" fontSize="20px">
        {product.name}
      </Heading>
      <Heading as="h5" fontSize="20px">
        Platform: {product.platform}
      </Heading>
      <Flex as="h5" fontSize="20px" flexDirection="column">
        <Text fontSize="20px">
          Single game price: <b>{product.price} $ </b>
        </Text>
        <Text fontSize="20px">
          Total: <b>{product.price * product.quantity} $ </b>
        </Text>
      </Flex>
      <Flex w="20%" justify="space-between" alignItems="center">
        <IconButton
          aria-label="Add"
          icon={<MinusIcon />}
          onClick={() => handleRemoveFromCart(product)}
        />
        <Text fontSize="22px">{product.quantity}</Text>
        <IconButton
          aria-label="Add"
          icon={<AddIcon />}
          onClick={() => handleAddToCart(product)}
        />
      </Flex>
    </Flex>
  )
}

export default CartSingleProduct
