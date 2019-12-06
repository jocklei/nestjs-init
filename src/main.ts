import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { Logger, ValidationPipe } from '@nestjs/common';

import * as helmet from 'helmet';

import { swagger } from './swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet()); // helmet() 阻止跨站脚本攻击

  app.setGlobalPrefix('api/v1'); // setGlobalPrefix() 全局添加前缀

  // app.useGlobalPipes(new ValidationPipe()); // 添加全局管道

  swagger(app); // Swagger 设置

  await app.listen(3000, () => Logger.log(`服务已经启动,请通过localhost:3000访问`));
}
bootstrap();
