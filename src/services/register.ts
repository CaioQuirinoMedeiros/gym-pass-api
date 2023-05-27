import { AppError } from '@/errors/AppError'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'

interface RegisterServiceParams {
  name: string
  email: string
  password: string
}

interface RegisterServiceReturn {
  user: User
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    params: RegisterServiceParams
  ): Promise<RegisterServiceReturn> {
    const { email, name, password } = params

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new AppError({ statusCode: 409, message: 'Email already exists' })
    }

    const passwordHash = await bcrypt.hash(password, 6)

    const user = await this.usersRepository.create({
      name: name,
      email: email,
      password_hash: passwordHash
    })

    return { user }
  }
}
