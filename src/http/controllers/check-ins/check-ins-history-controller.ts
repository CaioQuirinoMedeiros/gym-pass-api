import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsHistoryService } from '@/services/factories/make-fetch-user-check-ins-service'

const checkInsHistoryQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  size: z.coerce.number().nullable().optional()
})

export async function checkInsHistoryController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { page, size } = checkInsHistoryQuerySchema.parse(request.query)

  const fetchUserCheckInsHistoryService = makeFetchUserCheckInsHistoryService()

  const { checkIns } = await fetchUserCheckInsHistoryService.execute({
    page,
    size: size ?? undefined,
    userId: request.user?.sub
  })

  return reply.send({ checkIns })
}
