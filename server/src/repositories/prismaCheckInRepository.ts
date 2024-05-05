import { PrismaClient, CheckIn, Prisma } from '@prisma/client';
import { CheckInRepository } from './checkIn-repository';

const prisma = new PrismaClient();

export class PrismaCheckInRepository implements CheckInRepository {
    async createCheckIn(data: Prisma.CheckInCreateInput) {
        const createdCheckIn = await prisma.checkIn.create({ data });
        return createdCheckIn;
    }

    async findByAttendeeId(attendeeId: string): Promise<CheckIn | null> {
        const checkIn = await prisma.checkIn.findFirst({
            where: {
                attendeeId: parseInt(attendeeId),
            },
        });
        return checkIn;
    }
}
