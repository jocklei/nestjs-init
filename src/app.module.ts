import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarModule } from './carModule/car.module';
import { DistributorModule } from './distributorModule/distributor.module';

import { Car } from './carModule/car.entity';
import { Distributor } from './distributorModule/distributor.entity';

import { AppController } from './app.controller';

@Module({
  imports: [
    CarModule,
    DistributorModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [Car, Distributor],
      synchronize: true,
    }),
  ],
  controllers: [AppController]
})
export class AppModule { }
