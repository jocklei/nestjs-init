import { NestFactory } from '@nestjs/core';
import { Logger, INestApplication } from '@nestjs/common';

import * as helmet from 'helmet';
import * as compression from 'compression';

import { swagger } from './swagger';
import { AppModule } from './app.module';
import { AuthInterceptor } from './core/authentication.interceptor';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet()); // helmet() 阻止跨站脚本攻击
  app.use(compression()); // 压缩

  app.setGlobalPrefix('api/v1'); // setGlobalPrefix() 全局添加前缀
  app.useGlobalInterceptors(new AuthInterceptor()); // 认证拦截

  swagger(app); // Swagger 设置

  await app.listen(3000, () => Logger.log(`服务已经启动,请通过localhost:3000访问`));
}
bootstrap();
