import { AttendeeRepository } from "../repositories/attendee-repository"

interface RegisterUseCaseRequest {
  name: string
  email: string
  eventId: string
}

export class RegisterUseCase {
  constructor(private attendeeRepository: AttendeeRepository) {}

  async execute({
    name,
    email,
    eventId,
  }: RegisterUseCaseRequest) {
    const attendeeEvent = await this.attendeeRepository.create({
      name,
      email,
      eventId,
    })

    return {
      attendeeEvent,
    }
  }
}