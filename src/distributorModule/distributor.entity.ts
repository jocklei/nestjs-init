import { ApiModelProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Length, IsString, IsInt } from 'class-validator';

@Entity()
export class Distributor {
  // Id
  @PrimaryGeneratedColumn()
  @ApiModelProperty({ type: 'init', required: false, description: 'id', example: 0 })
  readonly id: number;

  // Name
  @Column('text')
  @IsString({ message: '必须为字符串类型' })
  @Length(2, 100, { message: '长度不能小于2个字符，不能大于100个字符' })
  @ApiModelProperty({ type: 'text', required: false, description: '经销商名称', example: '青岛市东宇汽车销售有限公司' })
  readonly name: string;

  // level
  @Column('text')
  @IsString({ message: '必须为字符串类型' })
  @Length(1, 1, { message: '长度只能为1个字符' })
  @ApiModelProperty({ type: 'text', required: false, description: '经销商级别', example: '1' })
  readonly level: string;

  // province
  @Column('text')
  @IsString({ message: '必须为字符串类型' })
  @Length(2, 50, { message: '长度不能小于2个字符，不能大于50个字符' })
  @ApiModelProperty({ type: 'text', required: false, description: '经销商所属省份', example: '山东省' })
  readonly province: string;

  // city
  @Column('text')
  @IsString({ message: '必须为字符串类型' })
  @Length(2, 25, { message: '长度不能小于2个字符，不能大于25个字符' })
  @ApiModelProperty({ type: 'text', required: false, description: '经销商所属城市（地级市）', example: '青岛市' })
  readonly city: string;

  // area
  @Column('text')
  @IsString({ message: '必须为字符串类型' })
  @Length(2, 25, { message: '长度不能小于2个字符，不能大于25个字符' })
  @ApiModelProperty({ type: 'text', required: false, description: '经销商所属城市（县级市）', example: '胶南市' })
  readonly area: string;

  // area
  @Column('text')
  @IsString({ message: '必须为字符串类型' })
  @Length(2, 25, { message: '长度不能小于2个字符，不能大于25个字符' })
  @ApiModelProperty({ type: 'text', required: false, description: '经销商详细地址', example: '世纪大道100号-1' })
  readonly address: string;
}
