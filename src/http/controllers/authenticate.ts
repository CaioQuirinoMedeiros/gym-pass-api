import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
  })

  const { email,  password } = authenticateBodySchema.parse(request.body)

  const authenticateService = makeAuthenticateService()

  await authenticateService.execute({
    email: email,
    password: password
  })

  return reply.send()
}
