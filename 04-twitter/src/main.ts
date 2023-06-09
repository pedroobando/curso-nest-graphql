import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix(apipath);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const portRunning = process.env.PORT;
  await app.listen(portRunning);
  logger.log(`App running on port ${portRunning}`);
}
bootstrap();
