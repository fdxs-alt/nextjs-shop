/* eslint-disable @typescript-eslint/no-unused-vars */
import { IRequest } from 'api/middleware'
import { NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'
import StripeAPI from 'stripe'

const stripe = new StripeAPI(process.env.STRIPE_SECRET as string, {
  apiVersion: '2020-08-27',
})

const createSession = async (
  req: IRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const { total } = req.body

  const paymentIntent = await stripe.paymentIntents.create({
    currency: 'usd',
    amount: total * 100,
  })

  res.status(201).json({ clientSecret: paymentIntent.client_secret })
}

export { createSession }
