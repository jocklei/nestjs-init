import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Distributor } from './distributor.entity';

import { DistributorController } from './distributor.controller';
import { DistributorService } from './distributor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Distributor])],
  controllers: [DistributorController],
  providers: [DistributorService],
})
export class DistributorModule { }
