import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'name',
    email: 'mail@mail.com',
    password: '123456'
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'mail@mail.com',
    password: '123456'
  })

  const token = authResponse.body?.token as string

  return { token }
}
