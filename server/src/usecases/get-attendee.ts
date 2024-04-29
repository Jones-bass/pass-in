import { Attendee } from '@prisma/client';
import { EmailAlreadyExistsError } from '../errors/email-already-exists-error';
import { AttendeeRepository, propsGetAttendee } from '../repositories/attendee-repository';

export class GetAttendeeUseCase {
  constructor(private attendeeRepository: AttendeeRepository) {}

  async execute( attendeeId: string): Promise<Attendee> {
    const attendeeGet = await this.attendeeRepository.findByAttendeeId(attendeeId);

    if (attendeeGet === null) {
      throw new EmailAlreadyExistsError();
    }

    return attendeeGet;
  }
}
