import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(graphqlUploadExpress());
  await app.listen(3000);
}
bootstrap();
