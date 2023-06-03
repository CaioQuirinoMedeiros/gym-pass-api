import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymsService } from '@/services/factories/make-fetch-nearby-gyms-service'

const searchNearbyGymsQuerySchema = z.object({
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 90
  })
})

export async function searchNearbyGyms(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { latitude, longitude } = searchNearbyGymsQuerySchema.parse(
    request.query
  )

  const fetchNearbyGymsService = makeFetchNearbyGymsService()

  const { gyms } = await fetchNearbyGymsService.execute({
    userLatitude: latitude,
    userLongitude: longitude
  })

  return reply.send({ gyms })
}
