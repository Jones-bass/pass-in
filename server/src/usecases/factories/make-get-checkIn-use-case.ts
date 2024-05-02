import { PrismaCheckInRepository } from '../../repositories/prismaCheckInRepository'
import { CheckInUseCase } from '../checkIn'

export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInRepository()
  const checkInListCase = new CheckInUseCase(checkInRepository)

  return checkInListCase
}