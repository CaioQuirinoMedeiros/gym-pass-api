import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateGymService } from '@/services/factories/make-create-gym-service'

const createGymBodySchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  phone: z.string().nullable(),
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 90
  })
})

export async function createGym(request: FastifyRequest, reply: FastifyReply) {
  const { description, latitude, longitude, phone, title } =
    createGymBodySchema.parse(request.body)

  const createGymService = makeCreateGymService()

  const { gym } = await createGymService.execute({
    description,
    latitude,
    longitude,
    phone,
    title
  })

  return reply.send({ gym })
}
