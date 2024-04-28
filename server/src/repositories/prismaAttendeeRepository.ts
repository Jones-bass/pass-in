import { AttendeeRepository, propsAttendee } from './attendee-repository'
import { prisma } from '../lib/prisma'

export class PrismaAttendeeRepository implements AttendeeRepository {
  async create(data: propsAttendee) {
    const createEvent = await prisma.attendee.create({
      data,
    })

    return createEvent
  }
}
