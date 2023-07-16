import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { PrismaService } from '../prisma.service';
import { TripsController } from './trips.controller';

@Module({
  controllers: [TripsController],
  providers: [TripsService, PrismaService],
})
export class TripsModule {}
