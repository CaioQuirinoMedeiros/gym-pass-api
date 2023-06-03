import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  role: 'MEMBER' | 'ADMIN'
) {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: await bcrypt.hash('123456', 6),
      role: role
    }
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: user.email,
    password: '123456'
  })

  const token = authResponse.body?.token as string
  const userId = authResponse.body?.userId as string

  return { token, userId }
}
