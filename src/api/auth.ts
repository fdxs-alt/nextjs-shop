import { IRequest } from './middleware'
import { getSession } from 'next-auth/client'
import { NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'
import { ErrorWithCode } from './error'

const sessionMiddleware = async (
  req: IRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const session = await getSession({ req })

  if (!session) {
    throw new ErrorWithCode('User unauthorized', 401)
  }

  req.session = session

  next()
}

export default sessionMiddleware
