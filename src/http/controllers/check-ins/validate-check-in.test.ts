import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser'
import { prisma } from '@/lib/prisma'

describe('ValidateCheckInController (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a  check-in', async () => {
    const { token, userId } = await createAndAuthenticateUser(app, 'ADMIN')

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

    let checkIn = await prisma.checkIn.create({
      data: { gym_id: gymId, user_id: userId }
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(204)

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: { id: checkIn.id }
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
