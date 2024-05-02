import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateEventUseCase } from '../usecases/factories/make-create-event-use-case'
import { TitleAlreadyExistsError } from '../errors/title-already-exists-error'

export async function createEventController(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string().min(4),
    details: z.string(),
    maximumAttendees: z.number().int().positive(),
  })

  const { title, details, maximumAttendees } =
    createGymBodySchema.parse(request.body)

  try {
    const createEventUseCase = makeCreateEventUseCase()

    await createEventUseCase.execute({
      title,
      details,
      maximumAttendees,
    })

    return reply.status(201).send()

  } catch (error: any) {
    error instanceof TitleAlreadyExistsError
    const errorMessage = error.message;
    return reply.status(400).send({ error: errorMessage });
  }
}