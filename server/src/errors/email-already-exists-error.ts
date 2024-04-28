export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('This e-mail is already registered for this event.')
  }
}
