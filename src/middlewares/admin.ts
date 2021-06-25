import { NextFunction, Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"

export const admin = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req
  const usersRepositories = getCustomRepository(UsersRepositories)

  const { admin } = await usersRepositories.findOne(user_id)

  if (admin) {
    return next()
  }
  return res.status(401).json({ 'error': 'User does not have permission for this action' })
}
