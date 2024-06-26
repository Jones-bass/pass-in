import { PrismaEventRepository } from '../../repositories/PrismaEventRepository'

import { CreateEventUseCase } from '../create-events'

export function makeCreateEventUseCase() {
  const eventsRepository = new PrismaEventRepository()
  const eventGetCase = new CreateEventUseCase(eventsRepository)

  return eventGetCase
}