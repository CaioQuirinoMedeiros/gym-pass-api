import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInService } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { AppError } from '@/errors/AppError'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('CheckInService', () => {
  beforeEach(async () => {
    vi.useFakeTimers()

    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'GymA',
      description: '',
      latitude: 0,
      longitude: 0,
      phone: ''
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'userId',
      userLatitude: 0,
      userLongitude: 0
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2020, 0, 1, 10, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'userId',
      userLatitude: 0,
      userLongitude: 0
    })

    await expect(() => {
      return sut.execute({
        gymId: 'gymId',
        userId: 'userId',
        userLatitude: 0,
        userLongitude: 0
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2020, 0, 1, 10, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'userId',
      userLatitude: 0,
      userLongitude: 0
    })

    vi.setSystemTime(new Date(2020, 0, 2, 5, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'userId',
      userLatitude: 0,
      userLongitude: 0
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should no be able to check in on distant gym', async () => {
    await gymsRepository.create({
      id: 'gym-02',
      title: 'GymB',
      description: '',
      latitude: -15.8008807,
      longitude: -47.9317159,
      phone: ''
    })

    await expect(() => {
      return sut.execute({
        gymId: 'gym-02',
        userId: 'userId',
        userLatitude: -15.7734181,
        userLongitude: -47.8738904
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
