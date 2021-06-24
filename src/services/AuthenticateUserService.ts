import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from 'bcryptjs'
import { sign } from "jsonwebtoken"

import env from '../config/env'

class AuthenticateRequest {
  email: string
  password: string
}

export class AuthenticateUserService {
  async execute({ email, password }: AuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories)
    const user = await usersRepositories.findOne({ email })
    if (!user) {
      throw new Error('Email/Password incorrect')
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      throw new Error('Email/Password incorrect')
    }

    const token = sign(
      { email: user.email },
      env.jwtSecret,
      {
        subject: user.id,
        expiresIn: '1d'
      })

      return token
  }
}
