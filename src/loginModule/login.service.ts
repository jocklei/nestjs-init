import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';

@Injectable()
export class LoginService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {
  }

  // 查询用户信息
  async user(user?: User): Promise<User> {
    const result: User = await this.userRepository.findOne(user);

    return result;
  }
}
