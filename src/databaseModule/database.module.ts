import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Car } from '../carModule/car.entity';
import { Distributor } from '../distributorModule/distributor.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      synchronize: true,
      entities: [Car, Distributor]
    })
  ]
})
export class DatabaseModule { }
