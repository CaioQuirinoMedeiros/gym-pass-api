import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'name',
      email: 'mail@mail.com',
      password: '123456'
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'mail@mail.com',
      password: '123456'
    })

    const token = authResponse.body?.token

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.user).toContain({
      name: 'name',
      email: 'mail@mail.com'
    })
  })
})
