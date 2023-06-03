import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInService } from '@/services/factories/make-validate-check-in-service'

const validateCheckInParamsSchema = z.object({
  checkInId: z.string().uuid()
})

export async function validateCheckInController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInService = makeValidateCheckInService()

  await validateCheckInService.execute({
    checkInId
  })

  return reply.status(204).send()
}
