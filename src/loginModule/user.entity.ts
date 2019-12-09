import { ApiProperty } from '@nestjs/swagger';

import { Length, IsString, Min } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  // Id
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: 'number', required: false, description: 'id', example: 1 })
  readonly id: number;

  // LoginName
  @Column('varchar')
  @IsString({ message: '必须为字符串类型' })
  @Length(2, 10, { message: '长度不能小于2个字符，不能大于10个字符' })
  @ApiProperty({ type: 'text', required: true, description: '登录名', example: 'zhangsan' })
  readonly loginName: string;

  // UserName
  @Column('varchar')
  @IsString({ message: '必须为字符串类型' })
  @Length(2, 10, { message: '长度不能小于2个字符，不能大于10个字符' })
  @ApiProperty({ type: 'text', required: false, description: '用户名', example: '张三' })
  readonly userName: string;

  // Password
  @Column('varchar')
  @Length(4, 10, { message: '长度不能小于4个字符，不能大于10个字符' })
  @ApiProperty({ type: 'text', required: true, description: '登录密码', example: '123456' })
  readonly password: string;

  // Sex
  @Column('varchar')
  @Length(2, 2, { message: '性别只能为男或者女' })
  @ApiProperty({ type: 'text', required: false, description: '用户性别', example: '男', enum: ['男', '女'] })
  readonly sex: string;

  // Age
  @Column('int')
  @IsString({ message: '必须为number类型' })
  @Min(10, { message: '年龄不能小于10' })
  @ApiProperty({ type: 'number', required: false, description: '用户年龄', example: '18' })
  readonly age: string;
}
