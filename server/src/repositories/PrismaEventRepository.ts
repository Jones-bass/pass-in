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
}