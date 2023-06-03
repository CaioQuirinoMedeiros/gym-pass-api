import { FastifyInstance } from 'fastify'

import { verifyJwtMiddleware } from '@/http/middlewares/verify-jwt-middleware'
import { createGymController } from './create-gym-controller'
import { searchGymsController } from './search-gyms-controller'
import { searchNearbyGymsController } from './search-nearby-gyms-controller'
import { getVerifyRoleMiddleware } from '@/http/middlewares/get-verify-role-middleware'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwtMiddleware)

  app.post(
    '/gyms/create',
    { onRequest: [getVerifyRoleMiddleware('ADMIN')] },
    createGymController
  )
  app.get('/gyms/search', searchGymsController)
  app.get('/gyms/nearby', searchNearbyGymsController)
}
