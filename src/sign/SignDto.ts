import { ApiProperty } from '@nestjs/swagger';

export class SignDto {

  @ApiProperty({ type: 'text', required: true, description: '签入名', example: 'zhangsan' })
  signName: string;

  @ApiProperty({ type: 'text', required: true, description: '签入密码', example: '123456' })
  password: string;

}
