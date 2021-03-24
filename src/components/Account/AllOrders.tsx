import { useOrders } from '@utils'
import React from 'react'
import { Stack, Accordion, Text, Center, Spinner } from '@chakra-ui/react'
import SingleOrder from './SingleOrder'
import NoOrder from './NoOrder'

const AllOrders = () => {
  const { orders, isLoading, isError } = useOrders()

  return (
    <Stack
      w="100%"
      maxWidth="1200px"
      alignSelf="center"
      spacing="30px"
      bg="white"
      padding="30px"
      rounded="md"
    >
      {isLoading ? (
        <Center height="500px">
          <Spinner />
        </Center>
      ) : isError ? (
        <Text>Error occured</Text>
      ) : orders && orders.length ? (
        <Accordion>
          {orders.map((order) => (
            <SingleOrder order={order} key={order._id} />
          ))}
        </Accordion>
      ) : (
        <NoOrder />
      )}
    </Stack>
  )
}

export default AllOrders
