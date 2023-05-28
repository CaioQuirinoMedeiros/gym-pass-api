import {
  Gym,
  GymCreateInput,
  GymFindByIdInput,
  GymFindManyNearbyInput,
  GymSearchManyInput,
  GymsRepository
} from '../gyms-repository'
import { prisma } from '@/lib/prisma'
import { Gym as PrismaGym } from '@prisma/client'

type PrismaGymToGym = <T extends PrismaGym | null>(
  prismaGym: T
) => T extends PrismaGym ? Gym : null

const prismaGymToGym: PrismaGymToGym = (prismaGym) => {
  if (!prismaGym) return null
  return {
    ...prismaGym,
    latitude: prismaGym.latitude.toNumber(),
    longitude: prismaGym.longitude.toNumber()
  } as any
}

export class PrismaGymsRepository implements GymsRepository {
  async findById(input: GymFindByIdInput): Promise<Gym | null> {
    const { gymId } = input

    const gym = await prisma.gym.findUnique({ where: { id: gymId } })

    return prismaGymToGym(gym)
  }

  async create(input: GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({ data: input })
    return prismaGymToGym(gym)
  }

  async searchMany(input: GymSearchManyInput): Promise<Gym[]> {
    const { page, query, size = 20 } = input

    const gyms = await prisma.gym.findMany({
      where: { title: { contains: query, mode: 'insensitive' } },
      skip: (page - 1) * size,
      take: size
    })

    return gyms.map(prismaGymToGym)
  }

  async findManyNearby(input: GymFindManyNearbyInput): Promise<Gym[]> {
    const { latitude, longitude, maxDistanceInKm } = input

    const gyms = await prisma.$queryRaw<PrismaGym[]>`
      SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= ${maxDistanceInKm}
    `

    return gyms.map(prismaGymToGym)
  }
}
