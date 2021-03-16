import { Db, MongoClient } from 'mongodb'
import { NextApiResponse, NextApiRequest } from 'next'
import { NextHandler } from 'next-connect'

export interface IRequest extends NextApiRequest {
  db: Db
}

let client: MongoClient | null = null
const { DATABASE_URL, MONGODB_DB } = process.env

const connectToDb = async () => {
  if (!client) {
    client = new MongoClient(DATABASE_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000,
    })
    await client.connect()
  }

  const db = client.db(MONGODB_DB as string)

  return { db }
}

const dbMiddleware = async (
  req: IRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const { db } = await connectToDb()

  req.db = db

  next()
}

export { dbMiddleware }
