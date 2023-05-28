import { randomUUID } from 'crypto'
import {
  CheckIn,
  CheckInCreateInput,
  CheckInsRepository,
  CheckInFindByUserOnDateInput,
  CheckInFindManyByUserInput,
  CheckInCountByUserIdInput,
  CheckInFindByIdInput,
  CheckInSaveInput
} from '../check-ins-repository'
import { isSameDay } from 'date-fns'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = []

  async create(input: CheckInCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: input.id ?? randomUUID(),
      gym_id: input.gym_id,
      user_id: input.user_id,
      created_at: new Date(),
      validated_at: input.validated_at ? new Date(input.validated_at) : null
    }

    this.checkIns.push(checkIn)
    return checkIn
  }

  async save(input: CheckInSaveInput): Promise<CheckIn> {
    const checkInIndex = this.checkIns.findIndex((checkIn) => {
      return checkIn.id === checkIn.id
    })

    if (checkInIndex !== -1) {
      this.checkIns[checkInIndex] = input.checkIn
    }

    return input.checkIn
  }

  async findById(input: CheckInFindByIdInput): Promise<CheckIn | null> {
    const { checkInId } = input

    const checkIn = this.checkIns.find((checkIn) => {
      return checkIn.id === checkInId
    })
    return checkIn || null
  }

  async findByUserIdOnDate(
    input: CheckInFindByUserOnDateInput
  ): Promise<CheckIn | null> {
    const { date, userId } = input

    const checkInOnSameDate = this.checkIns.find((checkIn) => {
      const isOnSameDate = isSameDay(date, checkIn.created_at)
      const isUserCheckIn = checkIn.user_id === userId
      return isUserCheckIn && isOnSameDate
    })
    return checkInOnSameDate || null
  }

  async findManyByUserId(
    input: CheckInFindManyByUserInput
  ): Promise<CheckIn[]> {
    const { page, size = 20, userId } = input

    const startIndex = (page - 1) * size
    const endIndex = page * size

    return this.checkIns.slice(startIndex, endIndex).filter((checkIn) => {
      return checkIn.user_id === userId
    })
  }

  async countByUserId(input: CheckInCountByUserIdInput): Promise<number> {
    const { userId } = input

    const checkIns = this.checkIns.filter((checkIn) => {
      return checkIn.user_id === userId
    })
    return checkIns.length
  }
}
