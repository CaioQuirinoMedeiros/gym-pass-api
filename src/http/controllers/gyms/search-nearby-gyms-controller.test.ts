import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser'
import { prisma } from '@/lib/prisma'

describe('SearchNearbyGymsController (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms nearby', async () => {
    const { token } = await createAndAuthenticateUser(app, 'MEMBER')

    const userLatitude = 10
    const userLongitude = 10

    await prisma.gym.createMany({
      data: [
        {
          title: 'JavaScript Gym',
          description: 'desc',
          phone: 'phone',
          latitude: userLatitude + 0.0001,
          longitude: userLongitude + 0.0001
        },
        {
          title: 'TypeScript Gym',
          description: 'desc',
          phone: 'phone',
          latitude: userLatitude + 1,
          longitude: userLongitude + 1
        }
      ]
    })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .set('Authorization', `Bearer ${token}`)
      .query({ latitude: userLatitude, longitude: userLongitude })

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym' })
    ])
  })
})
