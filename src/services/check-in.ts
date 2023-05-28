import { AppError } from '@/errors/AppError'
import { ResourceNotFoundError } from '@/errors/ResourceNotFoundError'
import {
  CheckIn,
  CheckInsRepository
} from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { getDistanceInKmBetweenCoordinates } from '@/utils/getDistanceInKmBetweenCoordinates'

interface CheckInServiceParams {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInServiceReturn {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute(params: CheckInServiceParams): Promise<CheckInServiceReturn> {
    const { gymId, userId, userLatitude, userLongitude } = params

    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const kmsFromUserToGym = getDistanceInKmBetweenCoordinates({
      from: { latitude: userLatitude, longitude: userLongitude },
      to: { latitude: gym.latitude, longitude: gym.longitude }
    })

    const MAX_DISTANCE_IN_KM = 0.1

    if (kmsFromUserToGym > MAX_DISTANCE_IN_KM) {
      throw new AppError({ statusCode: 403, message: 'Too far from the gym' })
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    )

    if (checkInOnSameDate) {
      throw new AppError({
        statusCode: 409,
        message: 'Already checked in today'
      })
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    })

    return { checkIn }
  }
}
