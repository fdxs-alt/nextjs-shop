import { errorHandler, dbMiddleware, asyncHandler, authMiddleware } from '@api'
import morgan from 'morgan'
import nc from 'next-connect'
import { createSession } from 'routes'

const handler = nc({ attachParams: true, onError: errorHandler })
  .use(morgan('dev'))
  .use(dbMiddleware)
  .post('/api/create-intent', authMiddleware, asyncHandler(createSession))

export default handler
