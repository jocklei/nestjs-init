import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Car } from './car.entity';
import { CarService } from './car.service';
import { ConfigModule } from 'src/configModule/configModule';

import { CarController } from './car.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), ConfigModule],
  controllers: [CarController],
  providers: [CarService]
})
export class CarModule { }
