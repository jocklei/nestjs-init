import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Controller, Get, Post, Put, Body, Query, UsePipes, HttpException, HttpStatus } from '@nestjs/common';

import { InsertResult, UpdateResult } from 'typeorm';

import { EntityValidationPipe } from '../shared/entityValidationPipe';
import { IQueryResponse, IQueryResponseNoDataMsg } from '../core/paging-query';

import { Car } from './car.entity';
import { CarService } from './car.service';

@ApiTags('车型管理')
@Controller('cars')
export class CarController {
  constructor(private carsService: CarService) { }

  // 查询车型
  @Get()
  @ApiOperation({ summary: '通过实体查询车型信息' })
  @ApiResponse({ status: 200, type: Car, isArray: true, description: '成功.' })
  findCar(@Query() query?: Car): Promise<IQueryResponse> { return this.carsService.findCar(query); }

  // 查询车型总数
  @Get('count')
  @ApiOperation({ summary: '查询车型总数' })
  @ApiResponse({ status: 200, description: '成功.' })
  findCarCount(): Promise<number> { return this.carsService.findCarCount(); }

  // 添加车型
  @Post()
  @ApiOperation({ summary: '添加车型' })
  @ApiResponse({ status: 200, description: '成功.' })
  @UsePipes(EntityValidationPipe)
  async insert(@Body() car: Car): Promise<InsertResult | IQueryResponseNoDataMsg> {

    const haveCar: IQueryResponse = await this.findCar(car);

    if (haveCar.count > 0) {
      throw new HttpException(`${car.name}已经存在`, HttpStatus.FORBIDDEN);
    } else {
      const result = await this.carsService.insert(car);
      return result;
    }
  }

  // 更新车型
  @Put()
  @ApiOperation({ summary: '更新车型' })
  @ApiResponse({ status: 200, description: '成功.' })
  @UsePipes(EntityValidationPipe)
  async update(@Body() car: Car): Promise<UpdateResult | IQueryResponseNoDataMsg> {

    const haveCar: IQueryResponse = await this.findCar(car);

    if (haveCar.count > 0) {
      throw new HttpException(`信息未变更`, HttpStatus.FORBIDDEN);
    } else {
      const result = await this.carsService.update(car.id, car);
      return result;
    }
  }
}
