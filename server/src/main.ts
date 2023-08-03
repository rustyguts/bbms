import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  const config = new DocumentBuilder()
    .setTitle('Big Boat Move Stuff API')
    .setDescription('The bbms API description')
    .setVersion('1.0')
    .addTag('bbms')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(4000)
}

bootstrap()
