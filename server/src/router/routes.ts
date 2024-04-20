import { FastifyInstance } from 'fastify'
import { create } from '../controller/create'

export async function eventRoutes(app: FastifyInstance) {
  app.post('/event', create)
}