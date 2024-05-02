export class AttendeeAlreadyCheckedExistsError extends Error {
  constructor() {
    super('Attendee already checked in!')
  }
}
