import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase } from '../usecases/factories/make-register-event-case'

export async function registerEventController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
  })

  const createEventParamsSchema = z.object({
    eventId: z.string(),
  })

  const { name, email } = registerBodySchema.parse(request.body)
  const { eventId }  = createEventParamsSchema.parse(request.params)

    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      email,
      name,
      eventId    
    })

  return reply.status(201).send()
}

