import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserDto } from './UserDto';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserDto])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UsersModule { }
