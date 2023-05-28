export type Gym = {
  id: string
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export type GymCreateInput = {
  id?: string
  title: string
  description: string | undefined | null
  phone: string | undefined | null
  latitude: number
  longitude: number
}

export type GymFindByIdInput = {
  gymId: string
}

export type GymSearchManyInput = {
  query: string
  page: number
  size?: number
}

export type GymFindManyNearbyInput = {
  latitude: number
  longitude: number
  maxDistanceInKm: number
}

export interface GymsRepository {
  findById(input: GymFindByIdInput): Promise<Gym | null>
  create(input: GymCreateInput): Promise<Gym>
  searchMany(input: GymSearchManyInput): Promise<Gym[]>
  findManyNearby(input: GymFindManyNearbyInput): Promise<Gym[]>
}
