import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PortsModule } from './ports/ports.module';
import { ShipsModule } from './ships/ships.module';

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [PortsModule, ShipsModule],
})
export class AppModule {}
