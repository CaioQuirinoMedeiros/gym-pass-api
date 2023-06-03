import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateGymService } from '@/services/factories/make-create-gym-service'

const createGymBodySchema = z.object({
  title: z.string(),
  description: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 90
  })
})

export async function createGymController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { description, latitude, longitude, phone, title } =
    createGymBodySchema.parse(request.body)

  const createGymService = makeCreateGymService()

  const { gym } = await createGymService.execute({
    description: description ?? null,
    latitude: latitude,
    longitude: longitude,
    phone: phone ?? null,
    title: title
  })

  return reply.status(201).send({ gym })
}
