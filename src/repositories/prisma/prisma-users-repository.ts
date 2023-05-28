import { prisma } from '@/lib/prisma'
import { UserCreateData, UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findById(userId: string) {
    return prisma.user.findUnique({ where: { id: userId } })
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email: email } })
  }

  async create(data: UserCreateData) {
    return prisma.user.create({ data: data })
  }
}
