import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

import { swagger } from './swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  // Swagger setting
  swagger(app);

  await app.listen(3000);
}
bootstrap();
