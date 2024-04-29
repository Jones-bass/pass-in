import { FastifyRequest, FastifyReply } from 'fastify';
import z from 'zod';
import { makeGetAttendeeListUseCase } from '../usecases/factories/make-get-attendeeList-use-case copy';

export async function getAttendeeController(request: FastifyRequest, reply: FastifyReply) {
  const eventParamsSchema = z.object({
    attendeeId: z.string(),
  });

  const { attendeeId } = eventParamsSchema.parse(request.params);

  const getEventUseCase = makeGetAttendeeListUseCase()

  const fetchedAttendee = await getEventUseCase.execute(attendeeId);
    
  return reply.status(200).send({ attendee: fetchedAttendee });
}
