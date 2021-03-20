/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiResponse } from 'next'
import { ErrorHandler } from 'next-connect'
import { IRequest } from './middleware'

class ErrorWithCode extends Error {
  constructor(message: string, public code: number) {
    super(message)
  }
}

const errorHandler: ErrorHandler<IRequest, NextApiResponse> = (
  err: { code: number; message: string },
  _req,
  res,
  _next
) => {
  res
    .status(err.code || 500)
    .send({ message: err.message || 'Internal server error' })
}

export { ErrorWithCode, errorHandler }
