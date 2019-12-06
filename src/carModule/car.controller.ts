import { Controller, Get, Post, Body, Query, UsePipes } from '@nestjs/common';

import { InsertResult } from 'typeorm';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

import { EntityValidationPipe } from '../shared/entityValidationPipe';
import { IQueryResponse, IQueryResponseNoDataMsg } from '../core/paging-query';

import { Car } from './car.entity';
import { CarService } from './car.service';
import { ConfigService } from '../configModule/config.service';

@ApiUseTags('车型管理')
@Controller('cars')
export class CarController {
  constructor(private catsService: CarService, private config: ConfigService) { }

  @Get()
  @ApiResponse({ status: 200, type: Car, isArray: true, description: '成功.' })
  findCar(@Query() query?: Car): Promise<IQueryResponse> { return this.catsService.findCar(query); }

  @Get('count')
  @ApiResponse({ status: 200, type: 'number', description: '成功.' })
  findCarCount(): Promise<number> { return this.catsService.findCarCount(); }

  @Post('add')
  @ApiResponse({ status: 200, description: '成功.' })
  @UsePipes(EntityValidationPipe)
  async add(@Body() car: Car): Promise<InsertResult | IQueryResponseNoDataMsg> {

    const haveCar: IQueryResponse = await this.findCar(car);

    if (haveCar.count > 0) {
      return { msg: `${car.name} 已经存在!` };
    } else {
      const result = await this.catsService.add(car);
      return result;
    }
  }

  @Get('config')
  @ApiResponse({ status: 200, type: Car, description: '成功.' })
  findConfig() { return this.config; }
}
