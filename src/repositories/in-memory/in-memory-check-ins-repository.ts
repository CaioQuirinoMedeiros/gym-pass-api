import { randomUUID } from 'crypto'
import {
  CheckIn,
  CheckInCreateData,
  CheckInsRepository
} from '../check-ins-repository'
import { isSameDay } from 'date-fns'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = []

  async create(data: CheckInCreateData): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null
    }

    this.checkIns.push(checkIn)
    return checkIn
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const checkInOnSameDate = this.checkIns.find((checkIn) => {
      const isOnSameDate = isSameDay(date, checkIn.created_at)
      const isUserCheckIn = checkIn.user_id === userId
      return isUserCheckIn && isOnSameDate
    })

    return checkInOnSameDate || null
  }
}
