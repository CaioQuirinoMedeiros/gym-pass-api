import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInService } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { AppError } from '@/errors/AppError'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('CheckInService', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInService(checkInsRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gymId',
      userId: 'userId'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2020, 0, 1, 10, 0, 0))

    await sut.execute({
      gymId: 'gymId',
      userId: 'userId'
    })

    await expect(() => {
      return sut.execute({
        gymId: 'gymId',
        userId: 'userId'
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2020, 0, 1, 10, 0, 0))
    await sut.execute({
      gymId: 'gymId',
      userId: 'userId'
    })

    vi.setSystemTime(new Date(2020, 0, 2, 5, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gymId',
      userId: 'userId'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
