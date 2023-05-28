import {
  CheckIn,
  CheckInCreateInput,
  CheckInsRepository,
  CheckInFindByUserOnDateInput,
  CheckInFindManyByUserInput,
  CheckInCountByUserIdInput
} from '../check-ins-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: CheckInCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data: { gym_id: data.gym_id, user_id: data.user_id }
    })

    return checkIn
  }

  async findByUserIdOnDate(
    input: CheckInFindByUserOnDateInput
  ): Promise<CheckIn | null> {
    const { date, userId } = input

    const checkInOnSameDate = await prisma.checkIn.findFirst({
      where: { user_id: userId }
    })

    return checkInOnSameDate || null
  }

  async findManyByUserId(
    input: CheckInFindManyByUserInput
  ): Promise<CheckIn[]> {
    const { page, size = 20, userId } = input

    const checkInOnSameDate = await prisma.checkIn.findMany({
      where: { user_id: userId },
      skip: (page - 1) * size,
      take: size
    })

    return checkInOnSameDate || null
  }

  async countByUserId(input: CheckInCountByUserIdInput): Promise<number> {
    const { userId } = input

    const count = await prisma.checkIn.count({ where: { user_id: userId } })
    return count
  }
}
