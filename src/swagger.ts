import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swagger = (app: INestApplication) => {

  const swaggerOptions = new DocumentBuilder()
    .setVersion('1.0.0')
    .setTitle('汽车销售服务管理系统')
    .setBasePath('http://localhost:3000/api/v1/')
    .setDescription('汽车销售服务管理系统API文档')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('api', app, document);
};
