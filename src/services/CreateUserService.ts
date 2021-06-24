import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { hash } from 'bcryptjs'

interface UserRequest {
  name: string
  email: string
  password: string
  admin?: boolean
}

export class CreateUserService {
  async execute ({ name, email, password, admin = false}: UserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories)

    if (!email) {
      throw new Error('Email incorrect')
    }

    const userAlreadyExists = await usersRepository.findOne({ email })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const encryptedPassword = await hash(password, 12)

    const user = usersRepository.create({
      name,
      email,
      password: encryptedPassword,
      admin
    })

    await usersRepository.save(user)
    return user
  }
}
