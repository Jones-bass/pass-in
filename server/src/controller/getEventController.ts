import { FastifyRequest, FastifyReply } from 'fastify';
import z from 'zod';
import { makeGetEventUseCase } from '../usecases/factories/make-get-event-use-case';

export async function getEventController(request: FastifyRequest, reply: FastifyReply) {
  const eventParamsSchema = z.object({
    eventId: z.string(),
  });

    const { eventId } = eventParamsSchema.parse(request.params);

    const getEventUseCase = makeGetEventUseCase()

    const fetchedEvent = await getEventUseCase.execute(eventId);
    
    return reply.status(200).send({ event: fetchedEvent });
}
