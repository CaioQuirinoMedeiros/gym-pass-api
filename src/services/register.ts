import { UsersRepository } from '@/repositories/users-repository'
import bcrypt from 'bcrypt'

interface RegisterServiceParams {
  name: string
  email: string
  password: string
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(params: RegisterServiceParams) {
    const { email, name, password } = params

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('Email already exists')
    }

    const passwordHash = await bcrypt.hash(password, 6)

    await this.usersRepository.create({
      name: name,
      email: email,
      password_hash: passwordHash
    })
  }
}
