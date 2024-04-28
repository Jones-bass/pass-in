import { Attendee } from '@prisma/client'

export interface propsAttendee {
  name: string
  email: string
  eventId: string
}

export interface AttendeeRepository {
  create(data: propsAttendee): Promise<Attendee | null>
  findMaxNumber(eventId: string, email: string): Promise<Attendee | null>
}
