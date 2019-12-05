import { Module } from '@nestjs/common';

import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { CarModule } from './carModule/car.module';
import { SharedModule } from './shared/shared.module';

import { User } from './users/user.entity';
import { Car } from './carModule/car.entity';

import { AppController } from './app.controller';

import { AppService } from './app.service';

@Module({
  imports: [
    CarModule,
    UserModule,
    // AuthModule,
    SharedModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mysql',
      entities: [Car, User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
