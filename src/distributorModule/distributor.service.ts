import { Injectable } from '@nestjs/common';

import { Repository, InsertResult } from 'typeorm';
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

  // 添加一条经销商信息
  add(distributor: Distributor): Promise<InsertResult> {
    return this.distributorRepository.insert(distributor);
  }
}
