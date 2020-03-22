import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';

import { CarDto } from './CarDto';
import { IQueryResponse, PagingQuery } from '../core/paging-query';

@Injectable()
export class CarService extends PagingQuery {

  constructor(
    @InjectRepository(CarDto)
    private readonly carsRepository: Repository<CarDto>) {
    super();
  }

  // 查询车辆信息（通过实体属性查询）
  async car(car?: CarDto): Promise<IQueryResponse> {
    const result: [CarDto[], number] = await this.carsRepository.findAndCount(car);

    return super.handleSuccess(result);
  }

  // 查询所有车信息总数
  count(): Promise<number> {
    return this.carsRepository.count();
  }

  // 添加车辆信息
  insert(car: CarDto): Promise<InsertResult> {
    return this.carsRepository.insert(car);
  }

  // 更新车辆信息
  update(id: number, car: CarDto): Promise<UpdateResult> {
    return this.carsRepository.update(id, car);
  }

  // 删除车辆信息
  delete(car: CarDto): Promise<DeleteResult> {
    return this.carsRepository.delete(car);
  }
}
