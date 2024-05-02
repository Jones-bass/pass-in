import { PrismaAttendeeRepository } from '../../repositories/prismaAttendeeRepository'
import { GetAttendeesEventUseCase } from '../get-attendees-event'

export function makeAttendeesEventUseCase() {
  const attendeesEventRepository = new PrismaAttendeeRepository()
  const attendeesEventCase = new GetAttendeesEventUseCase(attendeesEventRepository)

  return attendeesEventCase
}