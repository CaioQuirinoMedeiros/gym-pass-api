import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const authenticateService = makeAuthenticateService()

  const { user } = await authenticateService.execute({
    email: email,
    password: password
  })

  const token = await reply.jwtSign(
    { role: user.role },
    { sign: { sub: user.id } }
  )
  const refreshToken = await reply.jwtSign(
    { role: user.role },
    { sign: { sub: user.id, expiresIn: '7d' } }
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true
    })
    .send({ token, userId: user.id })
}
