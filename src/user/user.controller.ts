import { Controller, Get, Post, Put, Delete, Body, Query, UsePipes, HttpException, HttpStatus } from '@nestjs/common';

import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

import { UserDto } from './UserDto';
import { IQueryResponse } from '../core/paging-query';
import { EntityValidationPipe } from '../shared/entityValidationPipe';

import { UserService } from './user.service';

@ApiTags('用户管理')
@Controller('users')
export class UserController {
  constructor(private usersService: UserService) { }

  // 查询用户
  @Get()
  @ApiOperation({ summary: '用户列表' })
  @ApiResponse({ status: 200, type: UserDto, isArray: true, description: '成功.' })
  async user(@Query() query?: UserDto): Promise<IQueryResponse> {
    const result: IQueryResponse = await this.usersService.users(query);

    result.data.map((item: UserDto) => delete item.password);

    return result;
  }

  // 查询用户总数
  @Get('count')
  @ApiOperation({ summary: '用户总数' })
  @ApiResponse({ status: 200, description: '成功.' })
  count(): Promise<number> { return this.usersService.count(); }

  // 添加用户
  @Post()
  @ApiOperation({ summary: '添加用户' })
  @ApiResponse({ status: 200, description: '成功.' })
  @UsePipes(EntityValidationPipe)
  async insert(@Body() user: UserDto): Promise<InsertResult> {
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
  async update(@Body() user: UserDto): Promise<UpdateResult> {

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
  async delete(@Body() user: UserDto): Promise<DeleteResult> {

    const haveUser: IQueryResponse = await this.user(user);

    if (haveUser.count > 0) {
      const result = await this.usersService.delete(user);
      return result;
    } else {
      throw new HttpException(`没有删除的数据`, HttpStatus.FORBIDDEN);
    }
  }
}
