import { FastifyRequest, FastifyReply } from 'fastify';
import z from 'zod';
import { makeGetAttendeeListUseCase } from '../usecases/factories/make-get-attendeeList-use-case';

export async function getAttendeeController(request: FastifyRequest, reply: FastifyReply) {
  const eventParamsSchema = z.object({
    attendeeId: z.string(),
  });

  const { attendeeId } = eventParamsSchema.parse(request.params);

  const baseURL = `${request.protocol}://${request.hostname}`

  const checkInURL = new URL(`/attendees/${attendeeId}/check-in`, baseURL)

  const getEventUseCase = makeGetAttendeeListUseCase()

  const fetchedAttendee = await getEventUseCase.execute(attendeeId);

  const attendeeWithCheckInURL = {
    ...fetchedAttendee,
    checkInURL: checkInURL.toString()
  };
    
  return reply.status(200).send({ badge: attendeeWithCheckInURL });
}
