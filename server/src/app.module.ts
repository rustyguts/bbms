import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PortsModule } from './ports/ports.module';
import { ShipsModule } from './ships/ships.module';

@Module({
  imports: [PortsModule, ShipsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
