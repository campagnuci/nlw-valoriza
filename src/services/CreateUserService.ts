import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UserRepositories"

interface UserRequest {
  name: string
  email: string
  admin?: boolean
}

export class CreateUserService {
  async execute ({ name, email, admin}: UserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories)

    if (!email) {
      throw new Error('Email incorrect')
    }

    const userAlreadyExists = await usersRepository.findOne({ email })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const user = usersRepository.create({
      name,
      email,
      admin
    })

    await usersRepository.save(user)
    return user
  }
}
