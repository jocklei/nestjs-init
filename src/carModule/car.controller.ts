import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Query, UsePipes } from '@nestjs/common';

import { InsertResult } from 'typeorm';

import { EntityValidationPipe } from '../shared/entityValidationPipe';
import { IQueryResponse, IQueryResponseNoDataMsg } from '../core/paging-query';

import { Car } from './car.entity';
import { CarService } from './car.service';

@ApiTags('车型管理')
@Controller('cars')
export class CarController {
  constructor(private carsService: CarService) { }

  @Get()
  @ApiOperation({ summary: '通过实体查询车型信息' })
  @ApiResponse({ status: 200, type: Car, isArray: true, description: '成功.' })
  findCar(@Query() query?: Car): Promise<IQueryResponse> { return this.carsService.findCar(query); }

  @Get('count')
  @ApiOperation({ summary: '查询车型总数' })
  @ApiResponse({ status: 200, description: '成功.' })
  findCarCount(): Promise<number> { return this.carsService.findCarCount(); }

  @Post('add')
  @ApiOperation({ summary: '添加车型' })
  @ApiResponse({ status: 200, description: '成功.' })
  @UsePipes(EntityValidationPipe)
  async add(@Body() car: Car): Promise<InsertResult | IQueryResponseNoDataMsg> {

    const haveCar: IQueryResponse = await this.findCar(car);

    if (haveCar.count > 0) {
      return { msg: `车型 ${car.name} 已经存在!` };
    } else {
      const result = await this.carsService.add(car);
      return result;
    }
  }
}
