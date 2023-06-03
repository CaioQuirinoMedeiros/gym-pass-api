import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInService } from '@/services/factories/make-check-in-service'

const createCheckInBodySchema = z.object({
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 90
  })
})

const createCheckInParamsSchema = z.object({
  gymId: z.string().uuid()
})

export async function createCheckIn(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)
  const { gymId } = createCheckInParamsSchema.parse(request.params)

  const checkInService = makeCheckInService()

  const { checkIn } = await checkInService.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude
  })

  return reply.send({ checkIn })
}
