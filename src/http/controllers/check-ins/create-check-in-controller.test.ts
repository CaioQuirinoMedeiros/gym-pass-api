import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser'
import { prisma } from '@/lib/prisma'

describe('CreateCheckInController (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create check-in', async () => {
    const { token } = await createAndAuthenticateUser(app, 'MEMBER')

    const gym = await prisma.gym.create({
      data: {
        title: 'title',
        description: 'desc',
        phone: 'phone',
        latitude: 15,
        longitude: 25
      }
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins/create`)
      .set('Authorization', `Bearer ${token}`)
      .send({ latitude: 15, longitude: 25 })

    expect(response.statusCode).toBe(201)
  })
})
