import { Module } from '@nestjs/common';

import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarModule } from './carModule/car.module';
import { SharedModule } from './shared/shared.module';

import { Car } from './carModule/car.entity';

import { AppController } from './app.controller';

import { AppService } from './app.service';

@Module({
  imports: [
    CarModule,
    SharedModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mysql',
      entities: [Car],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
