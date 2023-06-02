import { makeGetUserProfileService } from '@/services/factories/make-get-user-profile-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const getUserProfileService = makeGetUserProfileService()
  const { user } = await getUserProfileService.execute({
    userId: request.user.sub
  })

  return reply.send({ user: { ...user, password_hash: undefined } })
}
