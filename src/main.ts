import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // exceptionFactory: (errors) => {
      //   console.log('Validation errors raw:', errors);
      //   return new BadRequestException(errors);
      // },
      stopAtFirstError: true,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
    }),
  );
  app.enableCors({
    origin: true, // или конкретный URL фронта: ['http://localhost:5173']
    credentials: true, // если используешь куки/авторизацию
  });

  const config = new DocumentBuilder()
    .setTitle('My NestJS API')
    .setDescription('some fancy description')
    .setVersion('1.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
