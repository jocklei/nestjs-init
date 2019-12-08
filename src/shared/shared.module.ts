import { Module } from '@nestjs/common';

import { ConfigModule } from '../configModule/configModule';

import { EntityValidationPipe } from './entityValidationPipe';

@Module({
  imports: [ConfigModule],
  providers: [
    EntityValidationPipe
  ],
  exports: [ConfigModule]
})
export class SharedModule { }
