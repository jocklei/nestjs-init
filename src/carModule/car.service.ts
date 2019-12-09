import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';

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
  async car(car?: Car): Promise<IQueryResponse> {
    const result: [Car[], number] = await this.carsRepository.findAndCount(car);
    return super.handleSuccess(result);
  }

  // 查询所有车信息总数
  count(): Promise<number> {
    return this.carsRepository.count();
  }

  // 添加车辆信息
  insert(car: Car): Promise<InsertResult> {
    return this.carsRepository.insert(car);
  }

  // 更新车辆信息
  update(id: number, car: Car): Promise<UpdateResult> {
    return this.carsRepository.update(id, car);
  }

  // 删除车辆信息
  delete(car: Car): Promise<DeleteResult> {
    return this.carsRepository.delete(car);
  }
}
