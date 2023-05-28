import { expect, describe, it, beforeEach } from 'vitest'
import bcrypt from 'bcrypt'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileService } from './get-user-profile'
import { ResourceNotFoundError } from '@/errors/ResourceNotFoundError'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('GetUserProfileService', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John',
      email: 'john@mail.com',
      password_hash: await bcrypt.hash('123456', 6)
    })

    const { user } = await sut.execute({ userId: createdUser.id })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() => {
      return sut.execute({ userId: 'non-existing' })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
