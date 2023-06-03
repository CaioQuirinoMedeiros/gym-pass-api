import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser'
import { prisma } from '@/lib/prisma'

describe('CheckInsHistoryController (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list the history of check-ins', async () => {
    const { token, userId } = await createAndAuthenticateUser(app, 'MEMBER')

    const gym = await prisma.gym.create({
      data: {
        title: 'title',
        description: 'desc',
        phone: 'phone',
        latitude: 15,
        longitude: 25
      }
    })

    await prisma.checkIn.createMany({
      data: [
        { gym_id: gym.id, user_id: userId },
        { gym_id: gym.id, user_id: userId }
      ]
    })

    const response = await request(app.server)
      .get(`/check-ins/history`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({ gym_id: gym.id, user_id: userId }),
      expect.objectContaining({ gym_id: gym.id, user_id: userId })
    ])
  })
})
