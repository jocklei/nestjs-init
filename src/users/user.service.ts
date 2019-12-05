import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { IQueryResponse, PagingQuery } from '../core/paging-query';

import { User } from './user.entity';

@Injectable()
export class UserService extends PagingQuery {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {
    super();
  }

  // 查询所有用户信息
  async findUserAll(): Promise<IQueryResponse> {
    const result: [User[], number] = await this.userRepository.findAndCount();
    return super.handleSuccess(result);
  }

  // 查询单个用户信息（通过实体属性查询）
  async findUser(user?: User): Promise<User> {
    const result: User = await this.userRepository.findOne(user);
    return result;
  }
}
