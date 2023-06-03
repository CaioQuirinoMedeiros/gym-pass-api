import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsService } from '@/services/factories/make-search-gyms-service'

const searchGymsQuerySchema = z.object({
  q: z.string(),
  page: z.coerce.number().min(1).default(1),
  size: z.coerce.number().nullable()
})

export async function searchGyms(request: FastifyRequest, reply: FastifyReply) {
  const { q, page, size } = searchGymsQuerySchema.parse(request.query)

  const searchGymService = makeSearchGymsService()

  const { gyms } = await searchGymService.execute({
    page,
    query: q,
    size: size ?? undefined
  })

  return reply.send({ gyms })
}
