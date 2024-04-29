import { AttendeeRepository, propsAttendee, propsGetAttendee } from './attendee-repository'
import { prisma } from '../lib/prisma'
import { TheMaximumNumberError } from '../errors/the-maximum-number-error'
import { EmailAlreadyExistsError } from '../errors/email-already-exists-error'
import { Attendee } from '@prisma/client'

export class PrismaAttendeeRepository implements AttendeeRepository {
  async create(data: propsAttendee) {
    const createEvent = await prisma.attendee.create({
      data,
    })

    return createEvent
  }

  async findMaxNumber(eventId: string, email: string) {
    const attendeeFromEmail = await prisma.attendee.findUnique({
      where: {
        eventId_email: {
          email,
          eventId
        }
      }
    })

    if (attendeeFromEmail !== null) {
      throw new EmailAlreadyExistsError()
    }

    const [event, amountOfAttendeesForEvent] = await Promise.all([
      prisma.event.findUnique({
        where: {
          id: eventId,
        }
      }),

      prisma.attendee.count({
        where: {
          eventId,
        }
      })
    ])

    if (event?.maximumAttendees && amountOfAttendeesForEvent >= event.maximumAttendees) {
      throw new TheMaximumNumberError()
    }

    return attendeeFromEmail
  }

  async findByAttendeeId( attendeeId: string): Promise<{
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    eventId: string;
  } | null>   
   {
    const getEvent = await prisma.attendee.findUnique({
      where: {
        id: parseInt(attendeeId),
      },
      select: {
        id: true, 
        name: true,
        email: true,
        createdAt: true,
        eventId: true,
        event: {
          select: {
            id: true,
            title: true,
            details: true,
            slug: true,
            maximumAttendees: true,
          },
        },
      },
    });
    return getEvent;
}
}
