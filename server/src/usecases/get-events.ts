import { Event } from '@prisma/client';
import { EventsRepository } from '../repositories/events-repositories';
import { EmailAlreadyExistsError } from '../errors/email-already-exists-error';

export class GetEventUseCase {
  constructor(private eventRepository: EventsRepository) {}

  async execute(eventId: string): Promise<Event> {
    const event = await this.eventRepository.findByEventId(eventId);

    if (event === null) {
      throw new EmailAlreadyExistsError();
    }

    return event;
  }
}
