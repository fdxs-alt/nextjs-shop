import { useOrders } from '@utils'
import React from 'react'
import { Skeleton, Stack, Accordion } from '@chakra-ui/react'
import SingleOrder from './SingleOrder'
import NoOrder from './NoOrder'

const AllOrders = () => {
  const { orders, isLoading } = useOrders()

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
        {isLoading && (
          <>
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
          </>
        )}

        {orders && orders.length ? (
          <Accordion padding="10px" defaultIndex={[0]}>
            {orders.map((order) => {
              return <SingleOrder key={order._id} order={order} />
            })}
          </Accordion>
        ) : (
          <NoOrder />
        )}
      </Stack>
    </>
  )
}

export default AllOrders
