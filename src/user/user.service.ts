import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';

import { IQueryResponse, PagingQuery } from '../core/paging-query';

import { UserDto } from './UserDto';

@Injectable()
export class UserService extends PagingQuery {
  constructor(
    @InjectRepository(UserDto)
    private readonly userRepository: Repository<UserDto>) {
    super();
  }

  // 查询用户信息（通过实体属性查询）
  async users(user?: UserDto): Promise<IQueryResponse> {
    const result: [UserDto[], number] = await this.userRepository.findAndCount(user);

    return super.handleSuccess(result);
  }

  // 查询用户信息
  async user(user?: UserDto): Promise<UserDto> {
    const result: UserDto = await this.userRepository.findOne(user);
    return result;
  }

  // 查询所有用户总数
  count(): Promise<number> {
    return this.userRepository.count();
  }

  // 添加用户信息
  insert(user: UserDto): Promise<InsertResult> {
    return this.userRepository.insert(user);
  }

  // 更新用户信息
  update(id: number, user: UserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, user);
  }

  // 删除用户
  delete(user: UserDto): Promise<DeleteResult> {
    return this.userRepository.delete(user);
  }
}
