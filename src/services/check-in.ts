import { AppError } from '@/errors/AppError'
import {
  CheckIn,
  CheckInsRepository
} from '@/repositories/check-ins-repository'

interface CheckInServiceParams {
  userId: string
  gymId: string
}

interface CheckInServiceReturn {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute(params: CheckInServiceParams): Promise<CheckInServiceReturn> {
    const { gymId, userId } = params

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    )

    console.log({ checkInOnSameDate })

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
