import { FastifyInstance } from 'fastify'
import { createEventController } from '../controller/createEventController'
import { registerEventController } from '../controller/registerEventController'
import { getEventController } from '../controller/getEventController'
import { getAttendeeController } from '../controller/getAttendeeController'
import { checkInController } from '../controller/checkInController'
import { getEventAttendeesController } from '../controller/getEventAttendeesController'

export async function eventRoutes(app: FastifyInstance) {
  app.post('/event', createEventController)

  app.post('/event/:eventId/attendees', registerEventController)

  app.get('/event/:eventId', getEventController)
  app.get('/event/:eventId/attendees', getEventAttendeesController)

  app.get('/attendees/:attendeeId/badge', getAttendeeController)
  app.get('/attendees/:attendeeId/check-in', checkInController)
}