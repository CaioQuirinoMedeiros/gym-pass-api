import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricsService } from '@/services/factories/make-get-user-metrics-service'

export async function checkInsMetricsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getUserMetricsService = makeGetUserMetricsService()

  const { checkInsCount } = await getUserMetricsService.execute({
    userId: request.user.sub
  })

  return reply.send({ checkInsCount })
}
