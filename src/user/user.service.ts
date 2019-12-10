import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';

import { IQueryResponse, PagingQuery } from '../core/paging-query';

import { User } from './user.entity';

@Injectable()
export class UserService extends PagingQuery {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {
    super();
  }

  // 查询用户信息（通过实体属性查询）
  async user(user?: User): Promise<IQueryResponse> {
    const result: [User[], number] = await this.userRepository.findAndCount(user);

    return super.handleSuccess(result);
  }

  // 查询用户信息
  async userOne(user?: User): Promise<User> {
    const result: User = await this.userRepository.findOne(user);
    return result;
  }

  // 查询所有用户总数
  count(): Promise<number> {
    return this.userRepository.count();
  }

  // 添加用户信息
  insert(user: User): Promise<InsertResult> {
    return this.userRepository.insert(user);
  }

  // 更新用户信息
  update(id: number, user: User): Promise<UpdateResult> {
    return this.userRepository.update(id, user);
  }

  // 删除用户
  delete(user: User): Promise<DeleteResult> {
    return this.userRepository.delete(user);
  }
}
