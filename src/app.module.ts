import { Module } from '@nestjs/common';

import { CarModule } from './carModule/car.module';
import { DistributorModule } from './distributorModule/distributor.module';

import { AppController } from './app.controller';
import { DatabaseModule } from './databaseModule/database.module';

@Module({
  imports: [
    CarModule,
    DatabaseModule,
    DistributorModule,
  ],
  controllers: [AppController]
})
export class AppModule { }
