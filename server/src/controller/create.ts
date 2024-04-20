import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateEventUseCase } from '../usecases/factories/make-create-event-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    details: z.string(),
    maximumAttendees: z.number(),
    slug: z.string(),
  })

  const { title, details, maximumAttendees, slug } =
    createGymBodySchema.parse(request.body)

  const createEventUseCase = makeCreateEventUseCase()

  await createEventUseCase.execute({
    title,
    details,
    maximumAttendees,
    slug,
  })

  return reply.status(201).send()
}