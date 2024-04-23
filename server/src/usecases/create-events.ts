import { Event } from '@prisma/client'
import { EventsRepository } from '../repositories/events-repositories'
import { generateSlug } from '../utils/generate-slug';
import { prisma } from '../lib/prisma';

interface CreateEventsUseCaseRequest {
  title: string,
  details: string,
  maximumAttendees: number,
}

interface CreateEventsUseCaseResponse {
  event: Event
}

export class CreateEventUseCase {
  constructor(private eventsRepository: EventsRepository ) {}

  async execute({
    title,
    details,
    maximumAttendees
  }: CreateEventsUseCaseRequest): Promise<CreateEventsUseCaseResponse> {
    
    const slug = generateSlug(title)

    const eventWithSameSlug = await this.eventsRepository.findBySlug(slug);
    
    if (eventWithSameSlug !== null) {
      throw new Error('Another event with the same title already exists.');
    }  

    const event = await this.eventsRepository.create({
      title,
      details,
      maximumAttendees,
      slug,
    })

    return {
      event,
    }
  }
}