import { FastifyRequest, FastifyReply } from 'fastify';
import { makeAttendeesEventUseCase } from '../usecases/factories/make-get-attendees-event-use-case';
import z from 'zod';

export async function getEventAttendeesController(request: FastifyRequest, reply: FastifyReply) {
  const eventParamsSchema = z.object({
    eventId: z.string(),
  });
  const { eventId } = eventParamsSchema.parse(request.params);

  const querystring = z.object({
    query: z.string().nullish().default('').transform(Number),
    pageIndex: z.string().nullish().default('0').transform(Number),
  });

  const { pageIndex, query } = querystring.parse(request.query);

  const getEventUseCase = makeAttendeesEventUseCase();
  const fetchedEvent = await getEventUseCase.execute(eventId, pageIndex, query);

  return reply.send(fetchedEvent);
}
