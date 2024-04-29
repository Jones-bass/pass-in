import { FastifyInstance } from 'fastify'
import { createEventController } from '../controller/createEventController'
import { registerEventController } from '../controller/registerEventController'
import { getEventController } from '../controller/getEventController'
import { getAttendeeController } from '../controller/getAttendeeController'

export async function eventRoutes(app: FastifyInstance) {
  app.post('/event', createEventController)

  app.post('/event/:eventId/attendees', registerEventController)

  app.get('/event/:eventId', getEventController)
  app.get('/attendees/:attendeeId/badge', getAttendeeController)


}