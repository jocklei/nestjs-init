import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarDto } from 'src/car/CarDto';
import { UserDto } from '../user/UserDto';

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
      entities: [UserDto, CarDto]
    })
  ]
})
export class DatabaseModule { }
