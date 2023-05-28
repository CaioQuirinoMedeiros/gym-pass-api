export type GymCreateData = {
  id?: string
  title: string
  description: string | undefined | null
  phone: string | undefined | null
  latitude: number
  longitude: number
}

export type Gym = {
  id: string
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(gymId: string): Promise<Gym | null>
  create(data: GymCreateData): Promise<Gym>
}
