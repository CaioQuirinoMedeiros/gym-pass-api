import { expect, describe, it, beforeEach } from 'vitest'
import { CheckInService } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository copy'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('CheckInService', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInService(checkInsRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gymId',
      userId: 'userId'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
