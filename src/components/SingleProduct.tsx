import { WrapItem, Heading, Flex, Button, Spacer, Text } from '@chakra-ui/react'
import { Image } from 'react-datocms'
import React from 'react'

const SingleProduct = ({ product }) => {
  return (
    <WrapItem
      key={product.id}
      w="300px"
      height="400px"
      borderColor="red.800"
      borderWidth="2px"
      borderStyle="solid"
      borderRadius="8px"
      d="flex"
      flexDir="column"
      alignItems="center"
      padding="10px"
    >
      <Image data={product.image.responsiveImage} />
      <Heading as="h5" fontSize={22} mt="20px">
        {product.name}
      </Heading>
      <Text fontSize="18px" mt="2" fontWeight={600}>
        Price: {product.price} $
      </Text>
      <Text fontSize="18px" mt="2" fontWeight={600}>
        Platform: {product.platform}
      </Text>
      <Flex justifyContent="space-between" w="90%" mt="30px">
        <Button colorScheme="red" w="fit-content">
          Add to cart
        </Button>
        <Spacer />
        <Button colorScheme="gray" w="fit-content">
          See more!
        </Button>
      </Flex>
    </WrapItem>
  )
}

export default SingleProduct
