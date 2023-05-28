import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsService } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository = new InMemoryGymsRepository()
let sut = new SearchGymsService(gymsRepository)

describe('SearchGymsService', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsService(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    for (let i = 1; i <= 20; i++) {
      const titlePrefix = i <= 10 ? 'gymA' : 'gymB'
      gymsRepository.create({
        id: `gym-${i}`,
        title: `${titlePrefix}-${i}`,
        description: '',
        latitude: 0,
        longitude: 0,
        phone: ''
      })
    }

    const { gyms } = await sut.execute({
      query: 'gymA',
      page: 1
    })

    expect(gyms).toHaveLength(10)
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 10; i++) {
      const titlePrefix = i <= 5 ? 'gymA' : 'gymB'
      gymsRepository.create({
        id: `gym-${i}`,
        title: `${titlePrefix}-${i}`,
        description: '',
        latitude: 0,
        longitude: 0,
        phone: ''
      })
    }

    const { gyms } = await sut.execute({
      query: 'gymA',
      page: 2,
      size: 3
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ id: 'gym-4' }),
      expect.objectContaining({ id: 'gym-5' })
    ])
  })
})
