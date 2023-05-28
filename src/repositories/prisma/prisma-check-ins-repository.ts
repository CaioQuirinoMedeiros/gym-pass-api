import {
  CheckIn,
  CheckInCreateData,
  CheckInsRepository,
  FindCheckInByUserOnDateInput,
  FindCheckInsByUserInput
} from '../check-ins-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: CheckInCreateData): Promise<CheckIn> {
    const checkIn = prisma.checkIn.create({
      data: { gym_id: data.gym_id, user_id: data.user_id }
    })

    return checkIn
  }

  async findByUserIdOnDate(
    input: FindCheckInByUserOnDateInput
  ): Promise<CheckIn | null> {
    const { date, userId } = input

    const checkInOnSameDate = prisma.checkIn.findFirst({
      where: { user_id: userId }
    })

    return checkInOnSameDate || null
  }

  async findManyByUserId(input: FindCheckInsByUserInput): Promise<CheckIn[]> {
    const { page, size = 20, userId } = input

    const checkInOnSameDate = prisma.checkIn.findMany({
      where: { user_id: userId },
      skip: (page - 1) * size,
      take: size
    })

    return checkInOnSameDate || null
  }
}
