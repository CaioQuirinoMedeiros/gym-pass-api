import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AuthenticateService } from '@/services/authenticate'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
  })

  const { email,  password } = authenticateBodySchema.parse(request.body)

  const usersRepository = new PrismaUsersRepository()
  const authenticateService = new AuthenticateService(usersRepository)

  await authenticateService.execute({
    email: email,
    password: password
  })

  return reply.send()
}
