import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['debug', 'verbose', 'log', 'error', 'warn'],
  });
  app.use(cookieParser());
  app.use(graphqlUploadExpress());
  await app.listen(8000);
}
bootstrap();
