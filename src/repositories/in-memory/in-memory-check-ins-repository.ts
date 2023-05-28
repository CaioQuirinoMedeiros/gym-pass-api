import { randomUUID } from 'crypto'
import {
  CheckIn,
  CheckInCreateData,
  CheckInsRepository,
  FindCheckInByUserOnDateInput,
  FindCheckInsByUserInput
} from '../check-ins-repository'
import { isSameDay } from 'date-fns'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = []

  async create(data: CheckInCreateData): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: data.id ?? randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null
    }

    this.checkIns.push(checkIn)
    return checkIn
  }

  async findByUserIdOnDate(
    input: FindCheckInByUserOnDateInput
  ): Promise<CheckIn | null> {
    const { date, userId } = input

    const checkInOnSameDate = this.checkIns.find((checkIn) => {
      const isOnSameDate = isSameDay(date, checkIn.created_at)
      const isUserCheckIn = checkIn.user_id === userId
      return isUserCheckIn && isOnSameDate
    })

    return checkInOnSameDate || null
  }

  async findManyByUserId(input: FindCheckInsByUserInput): Promise<CheckIn[]> {
    const { page, size = 20, userId } = input

    const startIndex = (page - 1) * size
    const endIndex = page * size

    return this.checkIns.slice(startIndex, endIndex).filter((checkIn) => {
      return checkIn.user_id === userId
    })
  }
}
