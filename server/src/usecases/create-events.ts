import { Event } from '@prisma/client'
import { EventsRepository } from '../repositories/events-repositories'

interface CreateEventsUseCaseRequest {
  title: string,
  details: string,
  maximumAttendees: number,
  slug: string
}

interface CreateEventsUseCaseResponse {
  event: Event
}

export class CreateEventUseCase {
  constructor(private eventsRepository: EventsRepository ) {}

  async execute({
    title,
    details,
    maximumAttendees,
    slug,
  }: CreateEventsUseCaseRequest): Promise<CreateEventsUseCaseResponse> {
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