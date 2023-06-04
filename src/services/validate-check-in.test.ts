import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { ValidateCheckInService } from './validate-check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ResourceNotFoundError } from '@/errors/ResourceNotFoundError'
import { CheckInTooOldToValidadeError } from '@/errors/CheckInTooOldToValidadeError'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInService

describe('ValidateCheckInService', () => {
  beforeEach(async () => {
    vi.useFakeTimers()

    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInService(checkInsRepository)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    const { checkIn } = await sut.execute({ checkInId: createdCheckIn.id })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() => {
      return sut.execute({ checkInId: 'non-existing' })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20min of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 30, 0))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    const _21minInMs = 21 * 60 * 1000
    vi.advanceTimersByTime(_21minInMs)

    await expect(() => {
      return sut.execute({ checkInId: createdCheckIn.id })
    }).rejects.toBeInstanceOf(CheckInTooOldToValidadeError)
  })
})
