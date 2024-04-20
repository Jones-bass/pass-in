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
}