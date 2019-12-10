import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/configModule';

import { EntityValidationPipe } from './entityValidationPipe';

@Module({
  imports: [ConfigModule],
  providers: [
    EntityValidationPipe
  ],
  exports: [ConfigModule]
})
export class SharedModule { }
