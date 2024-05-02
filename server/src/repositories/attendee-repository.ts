import { Attendee } from '@prisma/client'

export interface propsAttendee {
  name: string
  email: string
  eventId: string
}

export interface propsAttendeeEvent {
  name: string;
  email: string;
  createdAt: Date;
  checkIn: { createdAt: Date } | null;
}

export interface propsGetAttendee {
  name: string
  email: string
  attendeeId: string
}


export interface AttendeeRepository {
  create(data: propsAttendee): Promise<Attendee | null>
  findMaxNumber(eventId: string, email: string): Promise<Attendee | null>
 
  findAttendees(eventId: string, query: number, pageIndex: number): Promise<{ attendees: propsAttendeeEvent[], total: number }> 

  findByAttendeeId(attendeeId: string): Promise<{
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    eventId: string;
  } | null>   
}
