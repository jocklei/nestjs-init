import { ApiProperty } from '@nestjs/swagger';

import { Length, IsString, Min, IsNumber, IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserDto {
  // Id
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: 'number', required: false, description: 'id', example: 1 })
  id?: number;

  // SignName
  @Column('varchar')
  @IsNotEmpty()
  @IsString({ message: '必须为字符串类型' })
  @Length(2, 20, { message: '长度不能小于2个字符，不能大于20个字符' })
  @ApiProperty({ type: 'text', required: false, description: '登录名', example: 'zhangsan' })
  signName: string;

  // UserName
  @Column('varchar')
  @IsString({ message: '必须为字符串类型' })
  @Length(2, 20, { message: '长度不能小于2个字符，不能大于20个字符' })
  @ApiProperty({ type: 'text', required: false, description: '用户名', example: '张三' })
  userName?: string;

  // Password
  @Column('varchar')
  @IsNotEmpty()
  @Length(4, 10, { message: '长度不能小于4个字符，不能大于10个字符' })
  @ApiProperty({ type: 'text', required: false, description: '登录密码', example: '123456' })
  password: string;

  // Sex
  @Column('varchar')
  @IsString({ message: '必须为字符串类型' })
  @ApiProperty({ type: 'text', required: false, description: '性别', example: '男', enum: ['男', '女'] })
  sex?: string;

  // Age
  @Column('int')
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: '年龄必须为整数类型' })
  @Min(10, { message: '年龄最小10岁' })
  @ApiProperty({ type: 'number', required: false, description: '年龄', example: '18' })
  age?: number;

}
