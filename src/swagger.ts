import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swagger = (app: INestApplication) => {

  const swaggerOptions = new DocumentBuilder()
    .setVersion('1.0.0')
    .setTitle('汽车销售服务管理系统')
    .setDescription('汽车销售服务管理系统API文档')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('api/v1/doc.html', app, document);
};
