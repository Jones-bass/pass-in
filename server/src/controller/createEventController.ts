import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateEventUseCase } from '../usecases/factories/make-create-event-use-case'

export async function createEventController(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string().min(4),
    details: z.string(),
    maximumAttendees: z.number().int().positive(),
  })

  const { title, details, maximumAttendees } =
    createGymBodySchema.parse(request.body)

  const createEventUseCase = makeCreateEventUseCase()

  await createEventUseCase.execute({
    title,
    details,
    maximumAttendees,
  })

  return reply.status(201).send()
}