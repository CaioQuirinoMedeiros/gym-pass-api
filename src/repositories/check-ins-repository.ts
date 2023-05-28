export type CheckInCreateData = {
  id?: string
  created_at?: Date | string
  validated_at?: Date | string | null
  user_id: string
  gym_id: string
}

export type CheckIn = {
  id: string
  created_at: Date
  validated_at: Date | null
  user_id: string
  gym_id: string
}

export interface CheckInsRepository {
  create(data: CheckInCreateData): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date:Date): Promise<CheckIn | null>
}
