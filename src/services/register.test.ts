import { expect, describe, it } from 'vitest'
import { RegisterService } from './register'
import bcrypt from 'bcrypt'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AppError } from '@/errors/AppError'

describe('RegisterService', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456'
    })

    const isPasswordCorrectlyHashed = await bcrypt.compare(
      '123456',
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const email = 'john@mail.com'

    await registerService.execute({
      name: 'John Doe1',
      email: email,
      password: '123456'
    })

    await expect(() => {
      return registerService.execute({
        name: 'John Doe2',
        email: email,
        password: '123456'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
