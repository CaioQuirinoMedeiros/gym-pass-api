import { CheckInTooOldToValidadeError } from '@/errors/CheckInTooOldToValidadeError'
import { ResourceNotFoundError } from '@/errors/ResourceNotFoundError'
import {
  CheckIn,
  CheckInsRepository
} from '@/repositories/check-ins-repository'
import { differenceInMinutes } from 'date-fns'

interface ValidateCheckInServiceParams {
  checkInId: string
}

interface ValidateCheckInServiceReturn {
  checkIn: CheckIn
}

export class ValidateCheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute(
    params: ValidateCheckInServiceParams
  ): Promise<ValidateCheckInServiceReturn> {
    const { checkInId } = params

    const checkIn = await this.checkInsRepository.findById({
      checkInId: checkInId
    })

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const minutesAfterCheckInCreation = differenceInMinutes(
      new Date(),
      checkIn.created_at
    )
    const MAX_MIN_AFTER_CREATION_TO_VALIDATE = 20

    console.log({
      minutesAfterCheckInCreation,
      MAX_MIN_AFTER_CREATION_TO_VALIDATE
    })
    if (minutesAfterCheckInCreation > MAX_MIN_AFTER_CREATION_TO_VALIDATE) {
      throw new CheckInTooOldToValidadeError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save({ checkIn: checkIn })

    return { checkIn }
  }
}
