import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { TripsService } from '../trips/trips.service';

@Module({
  providers: [MessagesGateway, MessagesService, PrismaService, TripsService],
})
export class MessagesModule {}
