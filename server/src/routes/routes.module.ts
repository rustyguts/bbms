import { Module } from '@nestjs/common'
import { RoutesService } from './routes.service'
import { PrismaService } from '../prisma.service'
import { RoutesController } from './routes.controller'

@Module({
  controllers: [RoutesController],
  providers: [RoutesService, PrismaService],
})
export class RoutesModule {}
