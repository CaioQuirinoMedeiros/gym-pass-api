import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateService } from './authenticate'
import bcrypt from 'bcrypt'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from '@/errors/InvalidCredentialsError'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('AuthenticateService', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John',
      email: 'john@mail.com',
      password_hash: await bcrypt.hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: 'john@mail.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with invalid email', async () => {
    await expect(() => {
      return sut.execute({
        email: 'john@mail.com',
        password: '123456'
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with invalid password', async () => {
    await usersRepository.create({
      name: 'John',
      email: 'john@mail.com',
      password_hash: await bcrypt.hash('123456', 6)
    })

    await expect(() => {
      return sut.execute({
        email: 'john@mail.com',
        password: '654321'
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
