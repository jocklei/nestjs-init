import { Controller, Post, Body, UsePipes, HttpException, HttpStatus } from '@nestjs/common';

import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

import { User } from './user.entity';
import { EntityValidationPipe } from '../shared/entityValidationPipe';

import { LoginService } from './login.service';

@ApiTags('登录')
@Controller()
export class LoginController {
  constructor(private loginService: LoginService) { }

  // 登录
  @Post('login')
  @ApiOperation({ summary: '登录' })
  @ApiResponse({ status: 200, description: '成功.' })
  @UsePipes(EntityValidationPipe)
  async login(@Body() user: User): Promise<User> {

    const haveUser: User = await this.loginService.user(user);

    if (haveUser) {
      return haveUser;
    } else {
      throw new HttpException(`用户名或密码错误`, HttpStatus.NOT_FOUND);
    }
  }

}
