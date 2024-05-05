import { CheckIn } from '@prisma/client';
import { EmailAlreadyExistsError } from '../errors/email-already-exists-error';
import { CheckInRepository } from '../repositories/checkIn-repository';
import { FailedToCreateCheckInError } from '../errors/failed-to-create-checkin-error';

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute(attendeeId: string): Promise<CheckInUseCaseResponse> { 
      const existingCheckIn = await this.checkInRepository.findByAttendeeId(attendeeId);

      if (existingCheckIn) {
        throw new EmailAlreadyExistsError();
      }

      const newCheckIn = await this.checkInRepository.createCheckIn({
        attendee: { connect: { id: parseInt(attendeeId) } },
        createdAt: new Date(),
      });

      if (!newCheckIn) {
        throw new FailedToCreateCheckInError();
      }
  
      return { checkIn: newCheckIn }; 
    }
}
