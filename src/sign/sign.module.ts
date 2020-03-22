import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserDto } from 'src/user/UserDto';
import { SignController } from './sign.controller';

import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserDto])],
  controllers: [SignController],
  providers: [UserService]
})
export class SignModule { }
