import { ResourceNotFoundError } from '@/errors/ResourceNotFoundError'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface GetUserProfileServiceParams {
  userId: string
}

interface GetUserProfileServiceReturn {
  user: User
}

export class GetUserProfileService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    params: GetUserProfileServiceParams
  ): Promise<GetUserProfileServiceReturn> {
    const { userId } = params

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
