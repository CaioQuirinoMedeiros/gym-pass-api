import {
  CheckIn,
  CheckInsRepository
} from '@/repositories/check-ins-repository'

interface FetchUserCheckInsHistoryServiceParams {
  userId: string
  page: number
  size?: number
}

interface FetchUserCheckInsHistoryServiceReturn {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute(
    params: FetchUserCheckInsHistoryServiceParams
  ): Promise<FetchUserCheckInsHistoryServiceReturn> {
    const { userId, page, size } = params

    const checkIns = await this.checkInsRepository.findManyByUserId({
      userId: userId,
      page: page,
      size: size
    })

    return { checkIns }
  }
}
