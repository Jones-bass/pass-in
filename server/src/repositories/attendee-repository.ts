import { Attendee } from '@prisma/client'

export interface propsAttendee {
  name: string
  email: string
  eventId: string
}

export interface propsGetAttendee {
  name: string
  email: string
  attendeeId: string
}


export interface AttendeeRepository {
  create(data: propsAttendee): Promise<Attendee | null>
  findMaxNumber(eventId: string, email: string): Promise<Attendee | null>
  findByAttendeeId(attendeeId: string): Promise<{
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    eventId: string;
  } | null>   
}
