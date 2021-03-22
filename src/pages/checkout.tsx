import { CheckoutForm, Layout, NotLoggedInfo } from '@components'
import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useSession } from 'next-auth/client'
import { Flex } from '@chakra-ui/layout'
import { Center, Spinner } from '@chakra-ui/react'

const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

const Checkout = () => {
  const [session, loading] = useSession()
  return (
    <Layout title="Checkout" isWithNavbar={true}>
      <Flex p="50px" flexDir="column">
        {loading ? (
          <Center height="600px">
            <Spinner />
          </Center>
        ) : session ? (
          <Center>
            <Elements stripe={promise}>
              <CheckoutForm />
            </Elements>
          </Center>
        ) : (
          <NotLoggedInfo message="You must be logged in to finish transaction!" />
        )}
      </Flex>
    </Layout>
  )
}

export default Checkout
