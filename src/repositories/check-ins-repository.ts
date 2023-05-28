export type CheckIn = {
  id: string
  created_at: Date
  validated_at: Date | null
  user_id: string
  gym_id: string
}

export type CheckInCreateInput = {
  id?: string
  created_at?: Date | string
  validated_at?: Date | string | null
  user_id: string
  gym_id: string
}

export type CheckInFindByUserOnDateInput = {
  userId: string
  date: Date
}

export type CheckInFindManyByUserInput = {
  userId: string
  page: number
  size?: number
}

export type CheckInCountByUserIdInput = {
  userId: string
}

export interface CheckInsRepository {
  create(data: CheckInCreateInput): Promise<CheckIn>
  findByUserIdOnDate(input: CheckInFindByUserOnDateInput): Promise<CheckIn | null>
  findManyByUserId(input: CheckInFindManyByUserInput): Promise<CheckIn[]>
  countByUserId(input: CheckInCountByUserIdInput): Promise<number>
}
