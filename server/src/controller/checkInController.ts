import { FastifyRequest, FastifyReply } from 'fastify';
import z from 'zod';
import { makeCheckInUseCase } from '../usecases/factories/make-get-checkIn-use-case';
import { AttendeeAlreadyCheckedExistsError } from '../errors/attendee-already-checked-exists-error';

export async function checkInController(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    attendeeId: z.string(),
  });

  try {
    const { attendeeId } = paramsSchema.parse(request.params);

    const checkInUseCase = makeCheckInUseCase();

    const newCheckIn = await checkInUseCase.execute(attendeeId);
    return reply.status(200).send({ badge: newCheckIn });
 
  } catch (error: any) {
    error instanceof AttendeeAlreadyCheckedExistsError
    const errorMessage = error.message;
    return reply.status(400).send({ error: errorMessage });
  }
}