import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/users/user.entity';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService) { }

  async validateUser(user: User, password: string): Promise<any> {
    const userInfo: User = await this.userService.findUser(user);

    if (userInfo && userInfo.password === password) {
      return userInfo;
    }

    return null;
  }

  async login(user: User) {
    const payload = { userName: user.userName, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
