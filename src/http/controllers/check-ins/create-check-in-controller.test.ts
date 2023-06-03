import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser'

describe('CreateCheckInController (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

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

    const response = await request(app.server)
      .post(`/gyms/${gymId}/check-ins/create`)
      .set('Authorization', `Bearer ${token}`)
      .send({ latitude: 15, longitude: 25 })

    expect(response.statusCode).toBe(201)
  })
})
