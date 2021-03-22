import { useOrders } from '@utils'
import React from 'react'
import { Skeleton, Stack, Accordion, Text } from '@chakra-ui/react'
import SingleOrder from './SingleOrder'
import NoOrder from './NoOrder'

const AllOrders = () => {
  const { orders, isLoading, isError } = useOrders()

  return (
    <>
      <Stack
        w="65%"
        alignSelf="center"
        spacing="30px"
        bg="white"
        padding="30px"
        rounded="md"
      >
        {isLoading ? (
          <>
            {new Array(6).map((_, i) => (
              <Skeleton height="50px" key={i} />
            ))}
          </>
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
    </>
  )
}

export default AllOrders
