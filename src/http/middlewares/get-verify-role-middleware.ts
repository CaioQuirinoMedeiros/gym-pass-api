import { AppError } from '@/errors/AppError'
import { FastifyRequest } from 'fastify'

export function getVerifyRoleMiddleware(role: 'MEMBER' | 'ADMIN') {
  return async function verifyRoleMiddleware(request: FastifyRequest) {
    if (request.user?.role !== role) {
      throw new AppError({
        statusCode: 401,
        message: 'You need admin permission to for that'
      })
    }
  }
}
