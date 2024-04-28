import { Event, Prisma } from '@prisma/client'

export interface EventsRepository {
  findBySlug(slug: string): unknown
  create(data: Prisma.EventCreateInput): Promise<Event>
  findByEventId(eventId: string): Promise<{ 
    id: string; 
    title: string; 
    details: string | null; 
    slug: string; 
    maximumAttendees: number | null; 
  } | null>   
}