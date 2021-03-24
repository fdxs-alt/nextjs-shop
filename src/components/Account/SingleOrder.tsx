import React from 'react'
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { Image } from 'react-datocms'
import { Order, Product } from 'types'

interface Props {
  order: Order
}

const SingleOrder: React.FC<Props> = ({ order }) => {
  const { _id, date, products, userId, cartValue, ...rest } = order
  return (
    <AccordionItem padding="10px">
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left" fontWeight="700">
            Order #{_id} from {date}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel d="flex">
        <Wrap spacing="10px">
          <WrapItem>
            <Box p="5px 10px">
              <Heading as="h3" fontSize="20px" color="red.900" mb="10px">
                Total: {order.cartValue}$
              </Heading>
              {Object.entries(rest).map(([[first, ...others], value], i) => (
                <Text key={i}>
                  {first.toUpperCase() + others.join('')}: {value}
                </Text>
              ))}
            </Box>
          </WrapItem>
          {products.map((prod: Product) => (
            <WrapItem key={prod.id} alignItems="center" justifyContent="center">
              <Image data={prod.image.responsiveImage} />
              <Box p="5px 15px" width="220px">
                <Text fontWeight="600">Name: {prod.name}</Text>
                <Text fontWeight="600">Platform: {prod.platform}</Text>
                <Text fontWeight="600">Price: {prod.price}$</Text>
                <Text fontWeight="600">Quantity: {prod.quantity}</Text>
              </Box>
            </WrapItem>
          ))}
        </Wrap>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default SingleOrder
