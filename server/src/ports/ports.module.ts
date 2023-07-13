import { Module } from '@nestjs/common';
import { PortsService } from './ports.service';
import { PrismaService } from '../prisma.service';
import { PortsController } from './ports.controller';

@Module({
  controllers: [PortsController],
  providers: [PortsService, PrismaService]
})
export class PortsModule {}
