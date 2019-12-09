import { Injectable } from '@nestjs/common';

import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Distributor } from './distributor.entity';
import { IQueryResponse, PagingQuery } from '../core/paging-query';

@Injectable()
export class DistributorService extends PagingQuery {
  constructor(
    @InjectRepository(Distributor)
    private readonly distributorRepository: Repository<Distributor>) {
    super();
  }

  // 查询经销商信息（通过实体属性查询）
  async findDistributor(distributor?: Distributor): Promise<IQueryResponse> {
    const result: [Distributor[], number] = await this.distributorRepository.findAndCount(distributor);
    return super.handleSuccess(result);
  }

  // 查询所有经销商总数
  findDistributorCount(): Promise<number> {
    return this.distributorRepository.count();
  }

  // 添加经销商信息
  insert(distributor: Distributor): Promise<InsertResult> {
    return this.distributorRepository.insert(distributor);
  }

  // 更新经销商信息
  update(id: number, distributor: Distributor): Promise<UpdateResult> {
    return this.distributorRepository.update(id, distributor);
  }

  // 删除经销商
  delete(distributor: Distributor): Promise<DeleteResult> {
    return this.distributorRepository.delete(distributor);
  }
}
