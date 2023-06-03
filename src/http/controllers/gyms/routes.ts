import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { createGym } from './create-gym'
import { searchGyms } from './search-gyms'
import { searchNearbyGyms } from './search-nearby-gyms'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/gyms/create', createGym)
  app.get('/gyms/search', searchGyms)
  app.get('/gyms/nearby', searchNearbyGyms)
}
