import { Controller, Get, Post, Body, Query, UsePipes, Put, HttpException, HttpStatus } from '@nestjs/common';

import { InsertResult, UpdateResult } from 'typeorm';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

import { EntityValidationPipe } from '../shared/entityValidationPipe';
import { IQueryResponse, IQueryResponseNoDataMsg } from '../core/paging-query';

import { Distributor } from './distributor.entity';
import { DistributorService } from './distributor.service';

@ApiTags('经销商管理')
@Controller('distributors')
export class DistributorController {
  constructor(private distributorService: DistributorService) { }

  // 查询经销商
  @Get()
  @ApiOperation({ summary: '通过实体查询经销商信息' })
  @ApiResponse({ status: 200, type: Distributor, isArray: true, description: '成功.' })
  findDistributor(@Query() query?: Distributor): Promise<IQueryResponse> { return this.distributorService.findDistributor(query); }

  // 查询经销商总数
  @Get('count')
  @ApiOperation({ summary: '查询经销商总数' })
  @ApiResponse({ status: 200, description: '成功.' })
  findDistributorCount(): Promise<number> { return this.distributorService.findDistributorCount(); }

  // 添加经销商
  @Post()
  @ApiOperation({ summary: '添加经销商' })
  @ApiResponse({ status: 200, description: '成功.' })
  @UsePipes(EntityValidationPipe)
  async insert(@Body() distributor: Distributor): Promise<InsertResult | IQueryResponseNoDataMsg> {

    const haveDistributor: IQueryResponse = await this.findDistributor(distributor);

    if (haveDistributor.count > 0) {
      throw new HttpException(`信息未变更`, HttpStatus.FORBIDDEN);
    } else {
      const result = await this.distributorService.insert(distributor);
      return result;
    }
  }

  // 更新经销商
  @Put()
  @ApiOperation({ summary: '更新经销商' })
  @ApiResponse({ status: 200, description: '成功.' })
  @UsePipes(EntityValidationPipe)
  async update(@Body() distributor: Distributor): Promise<UpdateResult | IQueryResponseNoDataMsg> {

    const haveDistributor: IQueryResponse = await this.findDistributor(distributor);

    if (haveDistributor.count > 0) {
      throw new HttpException(`信息未变更`, HttpStatus.FORBIDDEN);
    } else {
      const result = await this.distributorService.update(distributor.id, distributor);
      return result;
    }
  }
}
