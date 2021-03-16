import { errorHandler, dbMiddleware } from '@api'
import morgan from 'morgan'
import nc from 'next-connect'

const handler = nc({ attachParams: true, onError: errorHandler })
  .use(morgan('dev'))
  .use(dbMiddleware)
  .get('/api', (req, res) => {
    res.json({ message: 'Working' })
  })

export default handler
