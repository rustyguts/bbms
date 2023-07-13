import { Module } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { PrismaService } from '../prisma.service';
import { ShipsController } from './ships.controller';

@Module({
  controllers: [ShipsController],
  providers: [ShipsService, PrismaService]
})
export class ShipsModule {}
