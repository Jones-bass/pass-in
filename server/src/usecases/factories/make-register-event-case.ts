import { PrismaAttendeeRepository } from '../../repositories/prismaAttendeeRepository'
import { RegisterUseCase } from '../register-events'

export function makeRegisterUseCase() {
  const attendeeRepository = new PrismaAttendeeRepository()
  const registerUseCase = new RegisterUseCase(attendeeRepository)

  return registerUseCase
}
