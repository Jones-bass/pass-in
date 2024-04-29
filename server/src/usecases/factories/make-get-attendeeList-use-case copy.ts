import { PrismaAttendeeRepository } from '../../repositories/prismaAttendeeRepository'

import { GetAttendeeUseCase } from '../get-attendee'

export function makeGetAttendeeListUseCase() {
  const attendeeRepository = new PrismaAttendeeRepository()
  const attendeeGetListCase = new GetAttendeeUseCase(attendeeRepository)

  return attendeeGetListCase
}