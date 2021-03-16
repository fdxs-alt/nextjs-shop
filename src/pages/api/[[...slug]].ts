import { errorHandler, dbMiddleware } from '@api'
import nc from 'next-connect'

const handler = nc({ attachParams: true, onError: errorHandler })
  .use(dbMiddleware)
  .get('/api', (req, res) => {
    res.json({ message: 'Working' })
  })

export default handler
