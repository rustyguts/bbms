import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { startServer } from './game/tick';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(4000);
  startServer()
}
bootstrap();
