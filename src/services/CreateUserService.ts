import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UserRepositories"

interface UserRequest {
  name: string
  email: string
  admin?: boolean
}

export class CreateUserService {
  async execute ({ name, email, admin}: UserRequest) {
    const userRepository = getCustomRepository(UsersRepositories)

    if (!email) {
      throw new Error('Email incorrect')
    }
    const userAlreadyExists = await userRepository.findOne({ email })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const user = userRepository.create({
      name,
      email,
      admin
    })

    await userRepository.save(user)
    return user
  }
}
