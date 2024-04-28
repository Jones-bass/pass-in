import { PrismaEventRepository } from '../../repositories/PrismaEventRepository'

import { GetEventUseCase } from '../get-events'

export function makeGetEventUseCase() {
  const eventsRepository = new PrismaEventRepository()
  const eventCase = new GetEventUseCase(eventsRepository)

  return eventCase
}

