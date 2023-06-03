import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { createCheckIn } from './create-check-in'
import { checkInsHistory } from './check-ins-history'
import { checkInsMetrics } from './check-ins-metrics'
import { validateCheckIn } from './validate-check-in'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/gyms/:gymId/check-ins/create', createCheckIn)
  app.patch('/check-ins/:checkInId/validate', validateCheckIn)
  app.get('/check-ins/history', checkInsHistory)
  app.get('/check-ins/metrics', checkInsMetrics)
}
