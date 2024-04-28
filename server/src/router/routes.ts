import { FastifyInstance } from 'fastify'
import { create } from '../controller/create'
import { register } from '../controller/register'

export async function eventRoutes(app: FastifyInstance) {
  app.post('/event', create)

  app.post('/event/:eventId/attendees', register)

}