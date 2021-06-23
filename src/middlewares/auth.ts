import { NextFunction, Request, Response } from "express"

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const admin = true
  if (admin) {
    return next()
  }
  return res.status(401).json({ 'error': 'User does not have permission for this action' })
}
