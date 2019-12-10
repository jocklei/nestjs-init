import { Module } from '@nestjs/common';

import { CarModule } from './car/car.module';
import { UsersModule } from './user/user.module';
import { SignModule } from './sign/sign.module';
import { DatabaseModule } from './database/database.module';

import { AppController } from './app.controller';

@Module({
  imports: [
    SignModule,
    UsersModule,
    CarModule,
    DatabaseModule,
  ],
  controllers: [AppController]
})
export class AppModule { }
