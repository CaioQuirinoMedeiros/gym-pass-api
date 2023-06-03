import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { createGymController } from './create-gym-controller'
import { searchGymsController } from './search-gyms-controller'
import { searchNearbyGymsController } from './search-nearby-gyms-controller'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/gyms/create', createGymController)
  app.get('/gyms/search', searchGymsController)
  app.get('/gyms/nearby', searchNearbyGymsController)
}
