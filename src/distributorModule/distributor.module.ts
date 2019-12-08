import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Distributor } from './distributor.entity';

import { DistributorService } from './distributor.service';

import { DistributorController } from './distributor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Distributor])],
  controllers: [DistributorController],
  providers: [DistributorService],
})
export class DistributorModule { }
