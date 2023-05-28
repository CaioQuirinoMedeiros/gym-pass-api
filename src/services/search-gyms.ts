import { Gym, GymsRepository } from '@/repositories/gyms-repository'

interface SearchGymsServiceParams {
  query: string
  page: number
  size?: number
}

interface SearchGymsServiceReturn {
  gyms: Gym[]
}

export class SearchGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute(
    params: SearchGymsServiceParams
  ): Promise<SearchGymsServiceReturn> {
    const { query, page, size } = params

    const gyms = await this.gymsRepository.searchMany({
      query: query,
      page: page,
      size: size
    })

    return { gyms }
  }
}
