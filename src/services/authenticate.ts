import { AppError } from '@/errors/AppError'
import { InvalidCredentialsError } from '@/errors/InvalidCredentialsError'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'

interface AuthenticateServiceParams {
  email: string
  password: string
}

interface AuthenticateServiceReturn {
  user: User
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    params: AuthenticateServiceParams
  ): Promise<AuthenticateServiceReturn> {
    const { email, password } = params

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await bcrypt.compare(password, user.password_hash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
