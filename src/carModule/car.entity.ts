import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

import { Length } from 'class-validator';

@Entity()
export class Car {
  // Id
  @PrimaryGeneratedColumn()
  @ApiModelProperty({
    type: 'number',
    required: false,
    description: 'id'
  })
  id: number;

  // Name
  @Column('text')
  @ApiModelProperty({
    type: 'text',
    required: true,
    example: '奥迪',
    description: '车辆名称'
  })
  @Length(2, 20, {
    message: '长度不能小于2个字符，不能大于20个字符'
  })
  name: string;

  // Year
  @Column('text')
  @ApiModelProperty({
    type: 'text',
    required: true,
    example: '2010',
    description: '车辆年份'
  })
  @Length(4, 4, {
    message: '长度为四个字符'
  })
  year: string;

  // Address
  @Column('text')
  @ApiModelProperty({
    type: 'text',
    required: false,
    example: '北京市东城区',
    description: '车辆地址'
  })
  @Length(4, 100, {
    message: '长度不能小于4个字符，不能大于100个字符'
  })
  address: string;
}
