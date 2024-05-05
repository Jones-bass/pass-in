import { CheckIn, Prisma } from '@prisma/client'

export interface propsCheckIn {
  attendee: string, 
  createdAt: Date,
  attendeeId: string
}

export interface CheckInRepository {
  createCheckIn(data: Prisma.CheckInCreateInput): Promise<CheckIn | null>
  findByAttendeeId(attendeeId: string): Promise<CheckIn | null>   
}
