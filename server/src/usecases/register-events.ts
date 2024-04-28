import { UserAlreadyExistsError } from "../errors/user-already-exists-error"
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
    const attendeeFromEmail = await this.attendeeRepository.findMaxNumber(eventId, email)

    if (attendeeFromEmail) {
      throw new UserAlreadyExistsError()
    }

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