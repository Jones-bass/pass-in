import { Prisma } from '@prisma/client'
import { EventsRepository } from './events-repositories'
import { prisma } from '../lib/prisma'

export class PrismaEventRepository implements EventsRepository {

  async create(data: Prisma.EventCreateInput) {
    const event = await prisma.event.create({
      data,
    })

    return event
  }

  async findBySlug(slug: string): Promise<{ 
    id: string 
    title: string 
    details: string | null 
    slug: string 
    maximumAttendees: number | null 
  } | null> {
    const eventSlug = await prisma.event.findUnique({
      where: { slug },
    })
    return eventSlug
  }

  
  async findByEventId(eventId: string): Promise<{ 
    id: string; 
    title: string; 
    details: string | null; 
    slug: string; 
    maximumAttendees: number | null; 
    attendeesAmount: number | null;
  } | null> {
    const getEvent = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        details: true,
        maximumAttendees: true,
        _count: true
      }
    });

    if (!getEvent) return null;
    return {
      id: getEvent.id,
      title: getEvent.title,
      slug: getEvent.slug,
      details: getEvent.details,
      maximumAttendees: getEvent.maximumAttendees,
      attendeesAmount: getEvent._count.Attendee, 
    };}
}
  