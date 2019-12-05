import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserService } from 'src/users/user.service';

@Module({
  providers: [AuthService, UserService]
})
export class AuthModule { }
