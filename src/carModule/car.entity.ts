import { ApiModelProperty } from '@nestjs/swagger';

import { Length, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Car {
  // Id
  @PrimaryGeneratedColumn()
  @ApiModelProperty({ type: 'number', required: false, description: 'id', example: 0 })
  readonly id: number;

  // Name
  @Column('varchar')
  @IsString({ message: '必须为字符串类型' })
  @Length(2, 20, { message: '长度不能小于2个字符，不能大于20个字符' })
  @ApiModelProperty({ type: 'text', required: false, description: '车辆名称', example: '奥迪' })
  readonly name: string;

  // Year
  @Column('varchar')
  @IsString({ message: '必须为字符串类型' })
  @Length(4, 4, { message: '长度只能为4个字符' })
  @ApiModelProperty({ type: 'text', required: false, description: '车辆年份', example: '2010' })
  readonly year: string;

  // Address
  @Column('varchar')
  @IsString({ message: '必须为字符串类型' })
  @Length(4, 100, { message: '长度不能小于4个字符，不能大于100个字符' })
  @ApiModelProperty({ type: 'text', required: false, description: '车辆地址', example: '北京市东城区' })
  readonly address: string;
}
