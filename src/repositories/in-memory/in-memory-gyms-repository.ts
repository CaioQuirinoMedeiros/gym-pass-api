import { randomUUID } from 'node:crypto'
import {
  Gym,
  GymCreateInput,
  GymFindByIdInput,
  GymFindManyNearbyInput,
  GymSearchManyInput,
  GymsRepository
} from '../gyms-repository'
import { getDistanceInKmBetweenCoordinates } from '@/utils/getDistanceInKmBetweenCoordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findById(input: GymFindByIdInput): Promise<Gym | null> {
    const { gymId } = input

    const gym = this.gyms.find((gym) => {
      return gym.id === gymId
    })

    return gym || null
  }

  async create(input: GymCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: input.id ?? randomUUID(),
      title: input.title,
      description: input.description ?? null,
      latitude: input.latitude,
      longitude: input.longitude,
      phone: input.phone ?? null
    }

    this.gyms.push(gym)

    return gym
  }

  async searchMany(input: GymSearchManyInput): Promise<Gym[]> {
    const { page, query, size = 20 } = input

    const startIndex = (page - 1) * size
    const endIndex = page * size

    return this.gyms.slice(startIndex, endIndex).filter((gym) => {
      return gym.title.toLowerCase().includes(query?.toLowerCase())
    })
  }

  async findManyNearby(input: GymFindManyNearbyInput): Promise<Gym[]> {
    const { latitude, longitude, maxDistanceInKm } = input

    return this.gyms.filter((gym) => {
      const distanceInKm = getDistanceInKmBetweenCoordinates({
        from: { latitude: latitude, longitude: longitude },
        to: { latitude: gym.latitude, longitude: gym.longitude }
      })
      return distanceInKm <= maxDistanceInKm
    })
  }
}
