import { Injectable } from '@nestjs/common';

import { Repository, InsertResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { IQueryResponse, PagingQuery } from '../core/paging-query';

import { Car } from './car.entity';

@Injectable()
export class CarService extends PagingQuery {

  constructor(
    @InjectRepository(Car)
    private readonly carsRepository: Repository<Car>) {
    super();
  }

  // 查询车辆信息（通过实体属性查询）
  async findCar(car?: Car): Promise<IQueryResponse> {
    const result: [Car[], number] = await this.carsRepository.findAndCount(car);
    return super.handleSuccess(result);
  }

  // 查询所有车信息总数
  findCarCount(): Promise<number> {
    return this.carsRepository.count();
  }

  // 添加一条车辆信息
  add(car: Car): Promise<InsertResult> {
    return this.carsRepository.insert(car);
  }
}
