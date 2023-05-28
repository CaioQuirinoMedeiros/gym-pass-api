import { randomUUID } from 'crypto'
import {
  CheckIn,
  CheckInCreateData,
  CheckInsRepository
} from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = []

  async create(data: CheckInCreateData): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null
    }

    this.checkIns.push(checkIn)
    return checkIn
  }
}
