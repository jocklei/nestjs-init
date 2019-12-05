import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

import { Length, MinLength } from 'class-validator';

@Entity()
export class User {
  // userId
  @PrimaryGeneratedColumn()
  @ApiModelProperty({
    type: 'number',
    required: false,
    description: 'userId'
  })
  userId: number;

  // userName
  @Column('text')
  @ApiModelProperty({
    type: 'text',
    required: true,
    example: '张三',
    description: '用户名'
  })
  @Length(2, 20, {
    message: '长度不能小于2个字符，不能大于20个字符'
  })
  userName: string;

  // password
  @Column('text')
  @ApiModelProperty({
    type: 'text',
    required: true,
    example: '123456',
    description: '密码'
  })
  @MinLength(6, {
    message: '长度至少6个字符'
  })
  password: string;
}
