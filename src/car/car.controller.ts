import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Controller, Get, Post, Put, Delete, Body, Query, UsePipes, HttpException, HttpStatus } from '@nestjs/common';

import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';

import { CarDto } from './CarDto';
import { IQueryResponse } from '../core/paging-query';
import { EntityValidationPipe } from '../shared/entityValidationPipe';

import { CarService } from './car.service';

@ApiTags('车型管理')
@Controller()
export class CarController {
  constructor(private carsService: CarService) { }

  // 查询车型
  @Get('cars')
  @ApiOperation({ summary: '车型列表' })
  @ApiResponse({ status: 200, type: CarDto, isArray: true, description: '成功.' })
  car(@Query() query?: CarDto): Promise<IQueryResponse> { return this.carsService.car(query); }

  // 查询车型总数
  @Get('cars/count')
  @ApiOperation({ summary: '车型总数' })
  @ApiResponse({ status: 200, description: '成功.' })
  count(): Promise<number> { return this.carsService.count(); }

  // 添加车型
  @Post('car')
  @ApiOperation({ summary: '添加车型' })
  @ApiResponse({ status: 200, description: '成功.' })
  @UsePipes(EntityValidationPipe)
  async insert(@Body() car: CarDto): Promise<InsertResult> {

    const haveCar: IQueryResponse = await this.car(car);

    if (haveCar.count === 0) {
      const result = await this.carsService.insert(car);
      return result;
    } else {
      throw new HttpException(`${car.name}已经存在`, HttpStatus.FORBIDDEN);
    }
  }

  // 更新车型
  @Put('car')
  @ApiOperation({ summary: '更新车型' })
  @ApiResponse({ status: 200, description: '成功.' })
  @UsePipes(EntityValidationPipe)
  async update(@Body() car: CarDto): Promise<UpdateResult> {

    const haveCar: IQueryResponse = await this.car(car);

    if (haveCar.count === 0) {
      const result = await this.carsService.update(car.id, car);
      return result;
    } else {
      throw new HttpException(`${car.name}已经存在`, HttpStatus.FORBIDDEN);
    }
  }

  // 删除车型
  @Delete('car')
  @ApiOperation({ summary: '删除车型' })
  @ApiResponse({ status: 200, description: '成功.' })
  async delete(@Body() car: CarDto): Promise<DeleteResult> {

    const haveCar: IQueryResponse = await this.car(car);

    if (haveCar.count > 0) {
      const result = await this.carsService.delete(car);
      return result;
    } else {
      throw new HttpException(`没有删除的数据`, HttpStatus.FORBIDDEN);
    }
  }

}
