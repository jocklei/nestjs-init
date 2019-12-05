import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swagger = (app: INestApplication) => {

  // car
  const carOptions = new DocumentBuilder()
    .setTitle('Car management')
    .setDescription('The cars API description')
    .setVersion('1.0.0')
    .build();

  const carDocument = SwaggerModule.createDocument(app, carOptions);
  SwaggerModule.setup('api', app, carDocument);
};
