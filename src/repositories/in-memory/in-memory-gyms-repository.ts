import { Gym, GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => {
      return gym.id === gymId
    })

    return gym || null
  }
}
