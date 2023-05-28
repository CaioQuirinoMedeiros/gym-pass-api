import {
  CheckIn,
  CheckInCreateData,
  CheckInsRepository
} from '../check-ins-repository'
import { isSameDay } from 'date-fns'
import { prisma } from '@/lib/prisma'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: CheckInCreateData): Promise<CheckIn> {
    const checkIn = prisma.checkIn.create({
      data: { gym_id: data.gym_id, user_id: data.user_id }
    })

    return checkIn
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const checkInOnSameDate = prisma.checkIn.findFirst({
      where: { user_id: userId }
    })

    return checkInOnSameDate || null
  }
}
