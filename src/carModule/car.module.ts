import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Car } from './car.entity';
import { CarService } from './car.service';

import { CarController } from './car.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), SharedModule],
  controllers: [CarController],
  providers: [CarService]
})
export class CarModule { }
