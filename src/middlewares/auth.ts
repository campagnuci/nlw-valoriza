import { Request, Response, NextFunction, response } from 'express'
import { verify } from 'jsonwebtoken'
import env from '../config/env'

interface Payload {
  sub: string
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization
  if (!bearerToken) {
    return res.status(401).end()
  }
  const [ , token ] = bearerToken.split(' ')
  try {
    const { sub } = verify(token, env.jwtSecret) as Payload
    req.user_id = sub
    return next()
  } catch (error) {
    return response.status(401).end()
  }
}
