import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { PortsModule } from './ports/ports.module';
import { ShipsModule } from './ships/ships.module';
import { RoutesModule } from './routes/routes.module';
import { TripsModule } from './trips/trips.module';

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [PortsModule, ShipsModule, ScheduleModule.forRoot(), RoutesModule, TripsModule],
})
export class AppModule {}
