import { randomUUID } from 'node:crypto'
import { Gym, GymCreateData, GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => {
      return gym.id === gymId
    })

    return gym || null
  }

  async create(data: GymCreateData): Promise<Gym> {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      latitude: data.latitude,
      longitude: data.longitude,
      phone: data.phone ?? null
    }

    this.gyms.push(gym)

    return gym
  }
}
