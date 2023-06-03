import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser'
import { prisma } from '@/lib/prisma'

describe('SearchGymsController (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, 'MEMBER')

    await prisma.gym.createMany({
      data: [
        {
          title: 'JavaScript Gym',
          description: 'desc',
          phone: 'phone',
          latitude: 15,
          longitude: 25
        },
        {
          title: 'TypeScript Gym',
          description: 'desc',
          phone: 'phone',
          latitude: 15,
          longitude: 25
        }
      ]
    })

    const response = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({ q: 'typescript' })

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'TypeScript Gym',
        description: 'desc',
        phone: 'phone',
        latitude: 15,
        longitude: 25
      })
    ])
  })
})
