
import { EmailAlreadyExistsError } from '../errors/email-already-exists-error';
import { AttendeeRepository, propsAttendeeEvent } from '../repositories/attendee-repository';

export class GetAttendeesEventUseCase {
  constructor(private attendeeRepository: AttendeeRepository) { }

  
  async execute(eventId: string, query: number, pageIndex: number): Promise<{ attendees: propsAttendeeEvent[], total: number }> {
    const attendeeGet = await this.attendeeRepository.findAttendees(eventId, query, pageIndex);

    if (attendeeGet === null) {
      throw new EmailAlreadyExistsError();
    }

    return attendeeGet;
  }
}


