import { NestFactory } from '@nestjs/core';
import { Logger, INestApplication, ValidationPipe } from '@nestjs/common';

import * as helmet from 'helmet';
import * as compression from 'compression';

import { swagger } from './swagger';
import { AppModule } from './app.module';
import { AuthInterceptor } from './core/authentication.interceptor';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, { cors: true });

  const validationPipeOptions = new ValidationPipe({
    whitelist: true, // 剥离属性
    transform: true, // DTO类自动将有效负载转换为对象类型
    disableErrorMessages: true, // 禁用返回验证详细错误信息
  });

  app.use(helmet()); // helmet() 阻止跨站脚本攻击中间件
  app.use(compression()); // 压缩中间件
  app.useGlobalPipes(validationPipeOptions);

  app.setGlobalPrefix('api/v1'); // setGlobalPrefix() 全局添加前缀
  app.useGlobalInterceptors(new AuthInterceptor()); // 认证拦截

  swagger(app); // Swagger 设置

  await app.listen(3000, () => Logger.log(`Service started,port:3000`));
}
bootstrap();
