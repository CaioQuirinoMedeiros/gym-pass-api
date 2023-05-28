import { expect, describe, it, beforeEach } from 'vitest'
import { FetchUserCheckInsHistoryService } from './fetch-user-check-ins-history'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository = new InMemoryCheckInsRepository()
let sut = new FetchUserCheckInsHistoryService(checkInsRepository)

describe('FetchUserCheckInsHistoryService', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryService(checkInsRepository)
  })

  it('should be able to fetch user check-ins history', async () => {
    await checkInsRepository.create({
      id: 'A',
      gym_id: 'gymId',
      user_id: 'user-01'
    })
    await checkInsRepository.create({
      id: 'B',
      gym_id: 'gymId',
      user_id: 'user-01'
    })

    const { checkIns } = await sut.execute({ userId: 'user-01', page: 1 })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ id: 'A' }),
      expect.objectContaining({ id: 'B' })
    ])
  })

  it('should be able to fetch paginated check-ins history', async () => {
    for (let i = 1; i <= 8; i++) {
      checkInsRepository.create({
        id: `check-in-${i}`,
        gym_id: 'gymId',
        user_id: 'user-01'
      })
    }

    const { checkIns } = await sut.execute({ userId: 'user-01', page: 2, size: 3 })
    
    expect(checkIns).toHaveLength(3)
    expect(checkIns).toEqual([
      expect.objectContaining({ id: 'check-in-4' }),
      expect.objectContaining({ id: 'check-in-5' }),
      expect.objectContaining({ id: 'check-in-6' })
    ])
  })
})
