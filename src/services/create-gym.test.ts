import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymService } from './create-gym'
import { AppError } from '@/errors/AppError'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository = new InMemoryGymsRepository()
let sut = new CreateGymService(gymsRepository)

describe('CreateGymService', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym A',
      description: null,
      latitude: 1,
      longitude: 1,
      phone: 'phone'
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
