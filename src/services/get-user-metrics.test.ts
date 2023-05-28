import { expect, describe, it, beforeEach } from 'vitest'
import { GetUserMetricsService } from './get-user-metrics'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository = new InMemoryCheckInsRepository()
let sut = new GetUserMetricsService(checkInsRepository)

describe('GetUserMetricsService', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsService(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
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

    const { checkInsCount } = await sut.execute({ userId: 'user-01' })

    expect(checkInsCount).toBe(2)
  })
})
