export type CheckIn = {
  id: string
  created_at: Date
  validated_at: Date | null
  user_id: string
  gym_id: string
}

export type CheckInCreateData = {
  id?: string
  created_at?: Date | string
  validated_at?: Date | string | null
  user_id: string
  gym_id: string
}

export type FindCheckInByUserOnDateInput = {
  userId: string
  date: Date
}

export type FindCheckInsByUserInput = {
  userId: string
  page: number
  size?: number
}

export interface CheckInsRepository {
  create(data: CheckInCreateData): Promise<CheckIn>
  findByUserIdOnDate(input: FindCheckInByUserOnDateInput): Promise<CheckIn | null>
  findManyByUserId(input: FindCheckInsByUserInput): Promise<CheckIn[]>
}
