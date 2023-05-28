import { endOfDay, startOfDay } from 'date-fns'
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
import { prisma } from '@/lib/prisma'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(input: CheckInCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({ data: input })
    return checkIn
  }

  async save(input: CheckInSaveInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.update({
      where: { id: input.checkIn.id },
      data: input.checkIn
    })

    return checkIn
  }

  async findById(input: CheckInFindByIdInput): Promise<CheckIn | null> {
    const { checkInId } = input

    return prisma.checkIn.findUnique({
      where: { id: checkInId }
    })
  }

  async findByUserIdOnDate(
    input: CheckInFindByUserOnDateInput
  ): Promise<CheckIn | null> {
    const { date, userId } = input

    const checkInOnSameDate = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: { gte: startOfDay(date), lte: endOfDay(date) }
      }
    })

    return checkInOnSameDate
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

    return checkInOnSameDate
  }

  async countByUserId(input: CheckInCountByUserIdInput): Promise<number> {
    const { userId } = input

    const count = await prisma.checkIn.count({ where: { user_id: userId } })
    return count
  }
}
