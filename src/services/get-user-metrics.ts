import {
  CheckInsRepository
} from '@/repositories/check-ins-repository'

interface GetUserMetricsServiceParams {
  userId: string
}

interface GetUserMetricsServiceReturn {
  checkInsCount: number
}

export class GetUserMetricsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute(
    params: GetUserMetricsServiceParams
  ): Promise<GetUserMetricsServiceReturn> {
    const { userId } = params

    const checkInsCount = await this.checkInsRepository.countByUserId({
      userId: userId
    })

    return { checkInsCount }
  }
}
