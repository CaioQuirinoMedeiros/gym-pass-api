import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser'
import { prisma } from '@/lib/prisma'

describe('CheckInsMetricsController (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able get the count of user check-ins', async () => {
    const { token, userId } = await createAndAuthenticateUser(app)

    const createGymResponse = await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'title',
        description: 'desc',
        phone: 'phone',
        latitude: 15,
        longitude: 25
      })

    const gymId = createGymResponse.body.gym.id

    await prisma.checkIn.createMany({
      data: [
        { gym_id: gymId, user_id: userId },
        { gym_id: gymId, user_id: userId }
      ]
    })

    const response = await request(app.server)
      .get(`/check-ins/metrics`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ checkInsCount: 2 })
  })
})
