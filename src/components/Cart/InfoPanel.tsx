import { Flex, Text } from '@chakra-ui/react'
import { ClearCart } from '@components'
import { useCartActions } from '@store'
import { resetCart } from '@utils'
import React from 'react'

interface Props {
  quantity: number
  cartValue: number
}

const InfoPanel: React.FC<Props> = ({ quantity, cartValue }): JSX.Element => {
  const dispatch = useCartActions()
  return (
    <Flex
      w="100%"
      margin="20px auto"
      justify="space-between"
      alignItems="center"
      maxWidth="1200px"
    >
      <Text fontSize="20px" fontWeight={600}>
        Quantity: {quantity}
      </Text>
      <Text fontSize="20px" fontWeight={600}>
        Cart value: {cartValue} $
      </Text>
      <ClearCart
        clearCart={() => dispatch(resetCart())}
        disabled={quantity !== 0}
      />
    </Flex>
  )
}

export default InfoPanel
