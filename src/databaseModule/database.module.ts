import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Car } from '../carModule/car.entity';
import { User } from 'src/loginModule/user.entity';
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
      entities: [User, Car, Distributor]
    })
  ]
})
export class DatabaseModule { }
