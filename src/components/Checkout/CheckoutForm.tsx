import { Box, Button, Text } from '@chakra-ui/react'
import { FormikField } from '@components'
import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js'
import {
  StripeCardElement,
  StripeCardElementChangeEvent,
} from '@stripe/stripe-js'
import { useCartActions, useCartState } from '@store'
import { useRouter } from 'next/dist/client/router'
import { fetchBuyIntent, resetCart } from '@utils'

const initalValues = {
  name: '',
  surname: '',
  email: '',
  country: '',
  street: '',
  city: '',
}

const cardStyle = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#32325d',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
}

const CheckoutForm = () => {
  const { cartValue, products } = useCartState()
  const { dispatch } = useCartActions()
  const [isInPayment, setIsInPayment] = useState(false)
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  return (
    <Formik
      initialValues={initalValues}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        const payload = await stripe?.confirmCardPayment(clientSecret, {
          receipt_email: values.email,
          payment_method: {
            card: elements?.getElement(CardElement) as StripeCardElement,
          },
        })
        if (payload?.error) {
          setError(`Payment failed ${payload.error.message}`)
        } else {
          await fetch('/api/create-order', {
            method: 'POST',
            body: JSON.stringify({ ...values, products, cartValue }),
            credentials: 'include',
          })

          resetForm()
          setError('')
          setSucceeded(true)
          dispatch(resetCart())
          setTimeout(() => {
            router.push('/account')
          }, 3000)
        }

        setSubmitting(false)
      }}
    >
      {({ isSubmitting, values }) => {
        return (
          <Box as={Form} w="30%" minW="450px">
            <FormikField
              type="text"
              name="name"
              placeholder="Your name"
              label="Name"
              required
              disabled={processing || isSubmitting}
            />
            <FormikField
              type="text"
              name="surname"
              label="Surname"
              placeholder="Your surname"
              required
              disabled={processing || isSubmitting}
            />
            <FormikField
              type="email"
              name="email"
              label="Email"
              placeholder="Your surname"
              required
              disabled={processing || isSubmitting}
            />
            <FormikField
              type="text"
              name="city"
              label="City"
              placeholder="Your city"
              required
              disabled={processing || isSubmitting}
            />
            <FormikField
              type="text"
              name="street"
              label="Street"
              placeholder="Your street"
              required
              disabled={processing || isSubmitting}
            />
            <FormikField
              type="text"
              name="country"
              label="Country"
              placeholder="Your country"
              required
              disabled={processing || isSubmitting}
            />

            {isInPayment ? (
              !succeeded ? (
                <Box mt="20px" p="10px 5px">
                  <CardElement
                    id="card-element"
                    options={cardStyle}
                    onChange={handleChange}
                  />
                  <Button
                    w="100%"
                    colorScheme="facebook"
                    mt="25px"
                    type="submit"
                    disabled={isSubmitting || disabled}
                  >
                    Pay now!
                  </Button>
                </Box>
              ) : (
                <Text
                  fontSize="20px"
                  color="facebook.900"
                  textAlign="center"
                  fontWeight={600}
                  marginTop="20px"
                >
                  Payment was succesfull, redirecting to your account.
                </Text>
              )
            ) : (
              <Button
                w="fit-content"
                alignSelf="center"
                size="lg"
                mt="20px"
                colorScheme="red"
                type="button"
                disabled={processing}
                onClick={async () => {
                  setError('')
                  if (Object.values(values).some((el) => el === '')) {
                    setError('You need to fill all given fields.')
                    return
                  }

                  if (typeof window !== 'undefined') {
                    setProcessing(true)
                    const data = await fetchBuyIntent(cartValue)

                    if (data.ok) {
                      const { clientSecret } = await data.json()
                      setClientSecret(clientSecret)

                      setIsInPayment(true)
                    } else {
                      setError(
                        'Error occured during proccessing. Please try again later.'
                      )
                    }
                    setProcessing(false)
                  }
                }}
              >
                Process to next step
              </Button>
            )}
            {error && (
              <Text
                fontSize="20px"
                color="red.500"
                textAlign="center"
                marginTop="30px"
              >
                {error}
              </Text>
            )}
          </Box>
        )
      }}
    </Formik>
  )
}

export default CheckoutForm
