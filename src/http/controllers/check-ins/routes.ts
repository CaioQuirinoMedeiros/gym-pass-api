import { FastifyInstance } from 'fastify'

import { verifyJwtMiddleware } from '@/http/middlewares/verify-jwt-middleware'
import { createCheckInController } from './create-check-in-controller'
import { checkInsHistoryController } from './check-ins-history-controller'
import { checkInsMetricsController } from './check-ins-metrics-controller'
import { validateCheckInController } from './validate-check-in-controller'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwtMiddleware)

  app.post('/gyms/:gymId/check-ins/create', createCheckInController)
  app.patch('/check-ins/:checkInId/validate', validateCheckInController)
  app.get('/check-ins/history', checkInsHistoryController)
  app.get('/check-ins/metrics', checkInsMetricsController)
}
