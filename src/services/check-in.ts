import { CheckIn, CheckInsRepository } from '@/repositories/check-ins-repository'

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

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    })

    return { checkIn }
  }
}
