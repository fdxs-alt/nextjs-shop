/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorWithCode } from '@api'
import { IRequest } from 'api/middleware'
import { NextApiResponse } from 'next'
import { getSession, Session } from 'next-auth/client'
import { NextHandler } from 'next-connect'
import StripeAPI from 'stripe'
import dayjs from 'dayjs'
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

const createSuccessfulPayment = async (
  req: IRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const {
    name,
    surname,
    email,
    country,
    street,
    city,
    products,
    cartValue,
  } = JSON.parse(req.body)

  const db = req.db

  const orderCollection = db.collection('orders')

  try {
    await orderCollection.insertOne({
      name,
      surname,
      email,
      country,
      street,
      city,
      products,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      userId: (req.session.user as any).id,
      cartValue,
      date: dayjs().format('HH:mm DD/MM/YYYY'),
    })

    return res.json({ success: true })
  } catch (error) {
    throw new ErrorWithCode('Error occured during saving', 500)
  }
}

const getAllUsersOrders = async (
  req: IRequest,
  res: NextApiResponse,
  next: NextApiResponse
) => {
  const db = req.db

  const orderCollection = db.collection('orders')

  try {
    const userOrders = await orderCollection
      .find(
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          userId: (req.session.user as any).id,
        },
        { sort: { date: -1 } }
      )
      .toArray()

    return res.json([...userOrders])
  } catch (error) {
    throw new ErrorWithCode('Error occured during saving', 500)
  }
}

export { createSession, createSuccessfulPayment, getAllUsersOrders }
