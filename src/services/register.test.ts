import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterService } from './register'
import bcrypt from 'bcrypt'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AppError } from '@/errors/AppError'

let usersRepository = new InMemoryUsersRepository()
let sut = new RegisterService(usersRepository)

describe('RegisterService', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterService(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
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
    const email = 'john@mail.com'

    await sut.execute({
      name: 'John Doe1',
      email: email,
      password: '123456'
    })

    await expect(() => {
      return sut.execute({
        name: 'John Doe2',
        email: email,
        password: '123456'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
