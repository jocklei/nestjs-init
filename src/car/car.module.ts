import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarDto } from './CarDto';
import { CarService } from './car.service';

import { CarController } from './car.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([CarDto]), SharedModule],
  controllers: [CarController],
  providers: [CarService]
})
export class CarModule { }
