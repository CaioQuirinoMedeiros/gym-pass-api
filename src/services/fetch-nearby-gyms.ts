import { Gym, GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearbyGymsServiceParams {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsServiceReturn {
  gyms: Gym[]
}

export class FetchNearbyGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute(
    params: FetchNearbyGymsServiceParams
  ): Promise<FetchNearbyGymsServiceReturn> {
    const { userLatitude, userLongitude } = params

    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
      maxDistanceInKm: 10
    })

    return { gyms }
  }
}
