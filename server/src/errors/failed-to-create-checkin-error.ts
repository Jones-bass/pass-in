export class FailedToCreateCheckInError extends Error {
  constructor() {
    super('Failed to create check-in.')
  }
}
