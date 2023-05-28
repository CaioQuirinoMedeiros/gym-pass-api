import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterService } from '@/services/factories/make-register-service'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  const registerService = makeRegisterService()

  await registerService.execute({
    name: name,
    email: email,
    password: password
  })

  return reply.status(201).send()
}
