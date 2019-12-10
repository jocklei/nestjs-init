import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Post, Body, HttpStatus, HttpException, HttpCode } from '@nestjs/common';

import { Sign } from './sign.class';
import { User } from '../user/user.entity';

import { UserService } from '../user/user.service';

@ApiTags('签入/签出')
@Controller()
export class SignController {

  constructor(private readonly userService: UserService) { }

  @Post('signIn')
  @HttpCode(200)
  @ApiOperation({ summary: '签入' })
  @ApiResponse({ status: 200, type: User, description: '成功.' })
  async signIn(@Body() sign: Sign): Promise<User | HttpException> {

    if (!sign.signName || !sign.password) {
      throw new HttpException(`登录名和密码不能为空`, HttpStatus.FORBIDDEN);
    }

    const result = await this.userService.user(sign);

    if (!result) {
      throw new HttpException(`用户名或密码错误`, HttpStatus.FORBIDDEN);
    }

    return result;
  }

  @Post('signOut')
  @HttpCode(200)
  @ApiOperation({ summary: '签出' })
  @ApiResponse({ status: 200, description: '成功.' })
  async signOut(@Body() sign: Sign): Promise<HttpException | { message: string }> {

    if (!sign.signName || !sign.password) {
      throw new HttpException(`登录名和密码不能为空`, HttpStatus.FORBIDDEN);
    }

    const result = await this.userService.user(sign);

    if (!result) {
      throw new HttpException(`用户名或密码错误`, HttpStatus.FORBIDDEN);
    } else {
      return { message: '签出成功' };
    }

  }

}
