import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser'

describe('CreateGymController (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'title',
        description: 'desc',
        phone: 'phone',
        latitude: 15,
        longitude: 25
      })

    expect(response.statusCode).toBe(201)
    expect(response.body.gym).toContain({
      title: 'title',
      description: 'desc',
      phone: 'phone',
      latitude: 15,
      longitude: 25
    })
  })
})
