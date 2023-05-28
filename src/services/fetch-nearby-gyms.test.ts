import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymsService } from './fetch-nearby-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository = new InMemoryGymsRepository()
let sut = new FetchNearbyGymsService(gymsRepository)

describe('FetchNearbyGymsService', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsService(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    const userLatitude = 0
    const userLongitude = 0

    gymsRepository.create({
      id: 'near_gym',
      title: 'Near Gym',
      description: '',
      latitude: userLatitude + 0.0001,
      longitude: userLongitude + 0.0001,
      phone: ''
    })

    gymsRepository.create({
      id: 'far_gym',
      title: 'Far Gym',
      description: '',
      latitude: userLatitude + 0.1,
      longitude: userLongitude + 0.1,
      phone: ''
    })

    const { gyms } = await sut.execute({
      userLatitude: userLatitude,
      userLongitude: userLongitude
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ id: 'near_gym' })])
  })
})
