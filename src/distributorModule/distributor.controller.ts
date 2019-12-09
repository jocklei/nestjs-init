import { Controller, Get, Post, Body, Query, UsePipes } from '@nestjs/common';

import { InsertResult } from 'typeorm';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

import { EntityValidationPipe } from '../shared/entityValidationPipe';
import { IQueryResponse, IQueryResponseNoDataMsg } from '../core/paging-query';

import { Distributor } from './distributor.entity';
import { DistributorService } from './distributor.service';

@ApiTags('经销商管理')
@Controller('distributors')
export class DistributorController {
  constructor(private distributorService: DistributorService) { }

  @Get()
  @ApiOperation({ summary: '通过实体查询经销商信息' })
  @ApiResponse({ status: 200, type: Distributor, isArray: true, description: '成功.' })
  findDistributor(@Query() query?: Distributor): Promise<IQueryResponse> { return this.distributorService.findDistributor(query); }

  @Get('count')
  @ApiOperation({ summary: '查询经销商总数' })
  @ApiResponse({ status: 200, description: '成功.' })
  findDistributorCount(): Promise<number> { return this.distributorService.findDistributorCount(); }

  @Post('add')
  @ApiOperation({ summary: '添加经销商' })
  @ApiResponse({ status: 200, description: '成功.' })
  @UsePipes(EntityValidationPipe)
  async add(@Body() distributor: Distributor): Promise<InsertResult | IQueryResponseNoDataMsg> {

    const haveDistributor: IQueryResponse = await this.findDistributor(distributor);

    if (haveDistributor.count > 0) {
      return { msg: `经销商 ${distributor.name} 已经存在!` };
    } else {
      const result = await this.distributorService.add(distributor);
      return result;
    }
  }
}
