import { Module } from '@nestjs/common';

import { CarModule } from './carModule/car.module';
import { LoginModule } from './loginModule/login.module';
import { DatabaseModule } from './databaseModule/database.module';
import { DistributorModule } from './distributorModule/distributor.module';

import { AppController } from './app.controller';

@Module({
  imports: [
    LoginModule,
    CarModule,
    DatabaseModule,
    DistributorModule,
  ],
  controllers: [AppController]
})
export class AppModule { }
