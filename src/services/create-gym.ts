import { Gym, GymsRepository } from '@/repositories/gyms-repository'

interface CreateGymServiceParams {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymServiceReturn {
  gym: Gym
}

export class CreateGymService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute(
    params: CreateGymServiceParams
  ): Promise<CreateGymServiceReturn> {
    const { title, description, latitude, longitude, phone } = params

    const gym = await this.gymsRepository.create({
      title: title,
      description: description,
      phone: phone,
      latitude: latitude,
      longitude: longitude
    })

  
    return { gym }
  }
}
