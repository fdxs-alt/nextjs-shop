import { errorHandler, dbMiddleware, asyncHandler, authMiddleware } from '@api'
import morgan from 'morgan'
import nc from 'next-connect'
import {
  createSession,
  createSuccessfulPayment,
  getAllUsersOrders,
} from 'routes'

const handler = nc({ attachParams: true, onError: errorHandler })
  .use(morgan('dev'))
  .use(dbMiddleware)
  .post('/api/create-intent', authMiddleware, asyncHandler(createSession))
  .post(
    '/api/create-order',
    authMiddleware,
    asyncHandler(createSuccessfulPayment)
  )
  .get('/api/get-orders', authMiddleware, asyncHandler(getAllUsersOrders))

export default handler
