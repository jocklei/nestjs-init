import { Controller, Get, Post, Put, Delete, Body, Query, UsePipes, HttpException, HttpStatus } from '@nestjs/common';

import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

import { User } from './user.entity';
import { IQueryResponse } from '../core/paging-query';
import { EntityValidationPipe } from '../shared/entityValidationPipe';

import { UserService } from './user.service';

@ApiTags('用户管理')
@Controller('users')
export class UserController {
  constructor(private usersService: UserService) { }

  // 查询用户
  @Get()
  @ApiOperation({ summary: '通过实体查询用户信息' })
  @ApiResponse({ status: 200, type: User, isArray: true, description: '成功.' })
  async user(@Query() query?: User): Promise<IQueryResponse> {
    const result: IQueryResponse = await this.usersService.users(query);

    result.data.map((item: User) => delete item.password);

    return result;
  }

  // 查询用户总数
  @Get('count')
  @ApiOperation({ summary: '查询用户总数' })
  @ApiResponse({ status: 200, description: '成功.' })
  count(): Promise<number> { return this.usersService.count(); }

  // 添加用户
  @Post()
  @ApiOperation({ summary: '添加用户' })
  @ApiResponse({ status: 200, description: '成功.' })
  @UsePipes(EntityValidationPipe)
  async insert(@Body() user: User): Promise<InsertResult> {
    const haveUser: IQueryResponse = await this.user(user);

    if (haveUser.count === 0) {
      const result = await this.usersService.insert(user);
      return result;
    } else {
      throw new HttpException(`用户${user.userName}已经存在`, HttpStatus.FORBIDDEN);
    }
  }

  // 更新用户
  @Put()
  @ApiOperation({ summary: '更新用户' })
  @ApiResponse({ status: 200, description: '成功.' })
  @UsePipes(EntityValidationPipe)
  async update(@Body() user: User): Promise<UpdateResult> {

    const haveUser: IQueryResponse = await this.user(user);

    if (haveUser.count === 0) {
      const result = await this.usersService.update(user.id, user);
      return result;
    } else {
      throw new HttpException(`用户${user.userName}已经存在`, HttpStatus.FORBIDDEN);
    }
  }

  // 删除用户
  @Delete()
  @ApiOperation({ summary: '删除用户' })
  @ApiResponse({ status: 200, description: '成功.' })
  async delete(@Body() user: User): Promise<DeleteResult> {

    const haveUser: IQueryResponse = await this.user(user);

    if (haveUser.count > 0) {
      const result = await this.usersService.delete(user);
      return result;
    } else {
      throw new HttpException(`没有删除的数据`, HttpStatus.FORBIDDEN);
    }
  }
}
